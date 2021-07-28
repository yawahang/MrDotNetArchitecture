import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppConst } from 'src/app/app.config';
import { MvCulture, MvNavigation } from 'src/core/model/base.model';
import { AuthService } from 'src/core/service/auth.service';
import { SidenavService } from './sidenav.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/core/service/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemingService } from 'src/core/service/themimg.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleSwitchComponent } from 'src/shared/components/role-switch/role-switch.component';
import { DataAccessComponent } from '../data-access/data-access.component';
import { MvNotification } from 'src/app/@admin/@setup/user/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  @ViewChild('menuSideNav', { static: true }) public menuSideNav: MatSidenav;
  @ViewChild('notificationSideNav', { static: true }) public notificationSideNav: MatSidenav;

  today = new Date();
  navigationList: MvNavigation[] = [];
  navigationListExternal: MvNavigation[] = [];
  defaultNavigationId: number;
  appName = '';
  name = '';
  profileImage = '';
  isAuthenticated = false;
  orgImage = '';
  culture = 'en';
  cultureList: MvCulture[] = [];
  themes: string[] = [];
  isDarkTheme = false;
  notificationList: MvNotification[] = [];

  constructor(public auth: AuthService,
    private sns: SidenavService,
    private router: Router,
    public theming: ThemingService,
    public translate: TranslateService,
    public dialog: MatDialog,
    public acc: AccountService
  ) {
    this._unsubscribeAll = new Subject();
    translate.setDefaultLang('en');
  }

  ngOnInit() {

    this.isAuthenticated = this.auth.isTokenValid();
    this.sns.setMenu(this.menuSideNav);
    this.sns.setNotification(this.notificationSideNav);

    this.auth.subProfileChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((valid) => {
        if (valid) {

          this.name = this.auth.getLocalStorage('Name') || '';
          this.profileImage = this.auth.getLocalStorage('ProfileImage') || AppConst.Data.ProfileImgUrl;
        }
      });

    this.auth.subApplicationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((valid) => {
        if (valid) {

          this.userInfo();
        }
      });

    this.sns.subNotificationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((valid) => {
        if (valid) {

          this.getNotifications();
        }
      });

    this.userInfo();
  }

  getNotifications() {

    this.notificationList = [];
    for (let i in Array.from(Array(5).keys())) {

      this.notificationList.push({
        NotificationId: Number(i) + 1,
        Notification: `Notification - ${Number(i) + 1}`,
        Author: 'Mr Developers',
        Description: `This is the description of notification`,
        NotificationDate: new Date().toLocaleString()
      });
    }
    // this.acc.getNotification({}, true)
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe((response: any) => {

    //   if (response && response?.Data && response?.Data[0]) {

    //     this.notificationList = response?.Data;
    //   } else {

    //     this.notificationList = [];
    //   }
    // });
  }

  notificationOpened() {

    this.sns.isNotificationOpen = true;
  }

  notificationClosed() {

    this.sns.isNotificationOpen = false;
  }

  userInfo() {

    this.name = this.auth.getLocalStorage('Name') || '';
    this.profileImage = this.auth.getLocalStorage('ProfileImage') || AppConst.Data.ProfileImgUrl;

    this.navigationList = this.auth.getLocalStorage('Navigation') || [];

    const defaultNavigationIdInternal = this.auth.getLocalStorage('DefaultNavigationId') || 0;
    const defaultNavigationInternal = this.navigationList.filter((n: MvNavigation) => (!n.IsExternal && n.NavigationId === defaultNavigationIdInternal));
    let defaultParentNavigationId = 0;
    if (defaultNavigationInternal[0]) {
      defaultParentNavigationId = defaultNavigationInternal[0].ParentNavigationId;
    } else {
      const navigationListInternal = this.navigationList.filter((n: MvNavigation) => !n.IsExternal);
      defaultParentNavigationId = navigationListInternal[0].ParentNavigationId;
    }

    this.navigationListExternal = this.navigationList.filter((n: MvNavigation) => n.IsExternal);
    const defaultNavigationExternal = this.navigationListExternal.filter((n: MvNavigation) => (n.IsExternal && n.NavigationId === defaultParentNavigationId));

    if (defaultNavigationExternal && defaultNavigationExternal[0]) {
      this.defaultNavigationId = defaultNavigationExternal[0].NavigationId || 0;
    } else {
      this.defaultNavigationId = this.navigationListExternal[0].NavigationId || 0;
    }

    this.auth.setLocalStorage('DefaultNavigationIdExternal', this.defaultNavigationId);

    this.setActiveNavigation();
    this.sns.subExternalNavChanged.next(true);

    const orgCode = this.auth.getOrgCode();
    this.orgImage = this.auth.getLocalStorage('OrgImage') || AppConst.Data.LogoUrl[orgCode];
    this.appName = this.auth.getLocalStorage('OrgName') || AppConst.Data.AppName;

    this.themes = this.theming.themes;
    this.isDarkTheme = this.auth.getLocalStorage('IsDarkTheme');
    this.theming.theme.next(this.isDarkTheme ? 'dark-theme' : 'light-theme');

    this.culture = this.auth.getLocalStorage('Culture') || AppConst.Data.Culture;
    this.auth.setLocalStorage('CultureOld', this.culture);
    this.cultureList = this.auth.getLocalStorage('CultureList') || AppConst.Data.CultureList;
    this.setCultureActive();
  }

  setActiveNavigation() {

    this.navigationListExternal.map((nav: MvNavigation) => {
      if (nav.NavigationId === this.defaultNavigationId) {
        nav.IsActive = true;
      } else {
        nav.IsActive = true;
      }
    });
  }

  setCultureActive() {

    this.cultureList.map((c: MvCulture) => {
      if (c.Culture === this.culture) {
        c.IsActive = true;
      } else {
        c.IsActive = false;
      }
    });
    this.auth.setLocalStorage('CultureList', this.cultureList);
  }

  userProfile() {

    this.router.navigate(['user-profile'], {
      replaceUrl: true
    });
  }

  onNavigationChange(nav: MvNavigation) {

    if (nav) {

      this.defaultNavigationId = nav.NavigationId;
      this.auth.setLocalStorage('DefaultNavigationIdExternal', this.defaultNavigationId);
      this.setActiveNavigation();
      this.sns.subExternalNavChanged.next(true);
    }
  }

  dataAccess() {

    const dialogRef = this.dialog.open(DataAccessComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'data-access-dialog'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {

      });
  }

  changeTheme() {

    this.toggleDarkTheme();
    this.acc.setUserSetting({ IsDarkTheme: this.isDarkTheme })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (!response && !response?.Data && response?.Data[0]) { // on failed to save in server

          this.toggleDarkTheme();
        }
      });
  }

  toggleDarkTheme() {

    this.isDarkTheme = !this.isDarkTheme;
    this.theming.theme.next(this.isDarkTheme ? 'dark-theme' : 'light-theme');
    this.auth.setLocalStorage('IsDarkTheme', this.isDarkTheme);
  }

  switchRole() {

    const dialogRef = this.dialog.open(RoleSwitchComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'role-switch-dialog'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {

      });
  }

  switchLanguage(culture: string) {

    const cultureId = this.toggleCulture(culture);
    this.acc.setUserSetting({ CultureId: cultureId })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (!response && !response?.Data && response?.Data[0]) {  // on failed to save in server
          culture = this.auth.getLocalStorage('CultureOld');
          this.toggleCulture(culture);
        }
      });
  }

  toggleCulture(culture: string): number {

    const cultureId = this.cultureList.filter((c: MvCulture) => c.Culture.toLowerCase() === culture)[0].CultureId;
    this.translate.use(culture);
    this.culture = culture;
    this.auth.setLocalStorage('Culture', culture);
    this.auth.subLangChanged.next(true);
    this.setCultureActive();
    return cultureId;
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
