import { UtilityService } from 'src/core/service/utility.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/core/service/auth.service';
import { AccountService } from 'src/core/service/account.service';
import { CustomValidationService } from 'src/core/service/custom-validation.service';
import { AppConst } from 'src/app/app.config';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  fmLogin: FormGroup;
  errorMessage: any;
  mvLogin: MvLogin = <MvLogin>{};
  hide = true;
  orgLogoUrl = '';
  orgCode = '';

  slideIndex = 0;
  loginBgUrl = [];

  constructor(
    public fb: FormBuilder,
    public acc: AccountService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private us: UtilityService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.orgCode = (this.route.snapshot.params.OrgCode || AppConst.Data.OrgCode).toLowerCase();
    this.orgLogoUrl = this.auth.getLocalStorage('OrgImage') || AppConst.Data.LogoUrl[this.orgCode];
    this.loginBgUrl = this.auth.getLocalStorage('OrgSlider') || AppConst.Data.LoginBgUrl[this.orgCode];

    this.fmLogin = this.fb.group({
      Username: ['', [Validators.required, CustomValidationService.emailValidator]],
      Password: ['', Validators.required]
    });

    if (this.orgCode === this.auth.getOrgCode()) {

      if (this.auth.isTokenValid()) {

        this.getUserInfo();
      } else if (this.auth.getLocalStorage('RefreshToken')) {

        this.auth.refreshToken()
      }
    } else {

      this.auth.clearSession();
    }
  }

  login() {

    this.errorMessage = '';
    this.us.formUtility(this.fmLogin, 'validate');
    if (this.fmLogin.valid) {

      const login = this.us.formUtility(this.fmLogin, 'value');
      this.mvLogin = login;
      this.mvLogin.OrgCode = this.orgCode;

      this.acc.login(this.mvLogin, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          if (response && response['AccessToken']) {

            this.auth.setSession(response);
            this.getUserInfo();
          } else {

            this.errorMessage = response;
          }
        });
    } else {

      this.errorMessage = 'InvalidForm';
    }
  }

  getUserInfo() {

    this.acc.getUserInfo({ OrgCode: this.orgCode })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response && response?.Data && response?.Data[0]) {

          this.auth.setUserInfo(response?.Data[0]);
          this.auth.subAuthenticated.next(true);

          const redirectUrl = this.auth.getLocalStorage('DefaultNavigationUrl');
          this.router.navigate([redirectUrl || AppConst.Data?.DefaultNavigationUrl], {
            replaceUrl: true
          });
        } else {

          this.errorMessage = response;
        }
      });
  }

  plusSlides(n: number) {

    const index = this.slideIndex + n;
    if (index > this.loginBgUrl.length - 1) {

      this.slideIndex = 0;
    } else {

      this.slideIndex = index;
    }
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
