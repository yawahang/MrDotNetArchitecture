import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/app.config';
import { HttpCacheService } from './http-cache.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MvUserInfo } from 'src/app/@admin/@setup/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  subAuthenticated = new BehaviorSubject<boolean>(false);
  subLangChanged = new BehaviorSubject<boolean>(false);
  subProfileChanged = new BehaviorSubject<boolean>(false);
  subApplicationChanged = new BehaviorSubject<boolean>(false);
  orgCode: string;

  constructor(private router: Router,
    private http: HttpClient,
    private cacheService: HttpCacheService,
    private snackBar: MatSnackBar) {
  }

  logout() {

    return this.http.post(AppConst?.Data?.ApiUrl + 'Account/Logout', {})
      .subscribe((response: any) => {
        this.logoutSession();
      });
  }

  logoutSession() {

    this.getOrgCode();
    this.clearSession();
    this.redirectOut();
  }

  getOrgCode(): string {

    this.orgCode = (this.getLocalStorage('OrgCode') || 'mr').toLowerCase();
    return this.orgCode;
  }

  refreshToken() {

    let promise = new Promise((resolve, reject) => {

      const refreshToken = this.getLocalStorage('RefreshToken');
      if (refreshToken) {

        this.http.post(AppConst?.Data?.ApiUrl + 'Account/RefreshToken', { RefreshToken: refreshToken })
          .toPromise()
          .then(response => {

            if (response && response['AccessToken']) {

              this.setSession(response);
              this.subAuthenticated.next(true);
              this.redirectIn();
              resolve(true);
            } else {

              this.snackBar.open('Unauthorized! Please login and try again!', 'x', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              this.logoutSession();
              resolve(false);
            }
          });
      } else {

        this.logoutSession();
        resolve(false);
      }
    });
    return promise;
  }

  redirectIn() {

    const redirectUrl = this.getLocalStorage('DefaultNavigationUrl');

    this.router.navigate([redirectUrl || AppConst?.Data?.DefaultNavigationUrl || '/login'], {
      replaceUrl: true
    });
  }

  redirectOut() {

    window.location.href = `${window.location.origin}/login/${this.orgCode}`;
  }

  // Utility 
  setSession(token: any) {

    const user = this.jwtHelper.decodeToken(token['AccessToken']);
    this.setLocalStorage('AccessToken', token?.AccessToken);
    this.setLocalStorage('RefreshToken', token?.RefreshToken);
    this.setLocalStorage('UserId', Number(user?.UserId));
    this.setLocalStorage('Username', user?.Username);
    this.setLocalStorage('OrgCode', user?.OrgCode);
    this.setLocalStorage('OrgName', user?.OrgName);
  }

  setUserInfo(info: MvUserInfo) {

    if (info) {

      this.setLocalStorage('DefaultOfficeId', info?.DefaultOfficeId);
      this.setLocalStorage('Name', info?.Name);
      this.setLocalStorage('ProfileImage', info?.ProfileImage);
      this.setLocalStorage('OrgImage', info?.OrgImage);
      this.setLocalStorage('IsDarkTheme', info?.IsDarkTheme);
      this.setLocalStorage('IsNavigationPin', info?.IsNavigationPin);
      this.setLocalStorage('DefaultApplicationId', info?.DefaultApplicationId);
      this.setLocalStorage('Application', info?.Application);
      this.setLocalStorage('DefaultNavigationId', info?.DefaultNavigationId);
      this.setLocalStorage('DefaultNavigationUrl', info?.DefaultNavigationUrl);
      this.setLocalStorage('Navigation', info?.Navigation);
      this.setLocalStorage('Culture', info?.Culture);
      this.setLocalStorage('CultureList', info?.CultureList);
      this.setLocalStorage('CurrentRoleId', Number(info?.CurrentRoleId));
      this.setLocalStorage('Role', info?.Role);
      this.setLocalStorage('GridRowActionExpanded', info?.GridRowActionExpanded);
    }
  }

  setLocalStorage(key: string, value: any) {

    let data = localStorage.getItem(AppConst.Data.StorageKey);
    if (data) {

      data = JSON.parse(this.decrypt(data));
      data = Object.assign(data, { [key]: value });
      localStorage.setItem(AppConst.Data.StorageKey, this.encrypt(JSON.stringify(data)));
    } else {

      let dataNew = Object.assign({}, { [key]: value });
      localStorage.setItem(AppConst.Data.StorageKey, this.encrypt(JSON.stringify(dataNew)));
    }
  }

  getLocalStorage(key: string) {

    let data = localStorage.getItem(AppConst.Data.StorageKey);
    if (data) {

      data = JSON.parse(this.decrypt(data));
      return data[key];
    } else {

      return null;
    }
  }

  isTokenValid(): boolean {

    let token = this.getLocalStorage('AccessToken');
    if (token) {

      return !this.jwtHelper.isTokenExpired(token);
    } else {

      return false;
    }
  }

  encrypt(value: string): any {

    if (value) {

      return CryptoJS.AES.encrypt(value, AppConst?.Data?.SecretKey);
    } else {

      return null;
    }
  }

  decrypt(value: string) {

    if (value) {

      var bytes = CryptoJS.AES.decrypt(value, AppConst?.Data?.SecretKey);
      var decrytedText = bytes.toString(CryptoJS.enc.Utf8);
      return decrytedText;
    } else {

      return null;
    }
  }

  clearSession() {

    localStorage.clear();
    sessionStorage.clear();
    this.cacheService.clearCache();
  }

  getActiveInternalNavigationId() {

    return this.getLocalStorage('DefaultNavigationId') || 0;
  }
}
