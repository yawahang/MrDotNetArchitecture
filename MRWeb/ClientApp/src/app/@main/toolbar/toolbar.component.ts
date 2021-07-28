import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvApplication, MvNavigation } from 'src/core/model/base.model';
import { AccountService } from 'src/core/service/account.service';
import { AuthService } from 'src/core/service/auth.service';
import { UtilityService } from 'src/core/service/utility.service';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  applicationList: MvApplication[] = [];
  navigationList: MvNavigation[] = [];
  defaultNavigationId: number;
  defaultNavigationIdExternal: number;
  defaultApplicationId: number;
  defaultApplication: string;
  defaultApplicationIcon: string;
  activeNavigationId: number;
  isFullscreen = false;

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private sns: SidenavService,
    public acc: AccountService,
    private us: UtilityService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.sns.isNavigationPin = this.auth.getLocalStorage('IsNavigationPin');
    this.sns.toggleMenu(this.sns.isNavigationPin);
    this.sns.toggleNotification(this.sns.isNotificationOpen);

    this.initToolbar();

    this.sns.subExternalNavChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((changed: boolean) => {

        if (changed) {

          this.navigationChange();
        } else {

          this.defaultNavigationId = 0;
          this.us.openSnackBar('InvalidNavigation', 'error');
        }
      });
  }

  initToolbar() {

    this.defaultApplicationId = this.auth.getLocalStorage('DefaultApplicationId') || 0;
    this.applicationList = this.auth.getLocalStorage('Application') || [];
    this.applicationList.map((a: MvApplication) => {

      if (a.ApplicationId === this.defaultApplicationId) {

        a.IsActive = true;
        this.defaultApplication = a.Application;
        this.defaultApplicationIcon = a.Icon;
      } else {

        a.IsActive = false;
      }
    });
  }

  navigationChange() {

    this.defaultNavigationId = this.auth.getLocalStorage('DefaultNavigationId') || 0;
    this.defaultNavigationIdExternal = this.auth.getLocalStorage('DefaultNavigationIdExternal') || 0;

    const navList = this.auth.getLocalStorage('Navigation') || [];
    this.navigationList = navList.filter((n: MvNavigation) => (!n.IsExternal && n.ParentNavigationId === this.defaultNavigationIdExternal));
    if (this.navigationList[0]) {

      const defaultNav = this.navigationList.filter((n: MvNavigation) => n.NavigationId === this.defaultNavigationId);
      if (defaultNav[0]) {

        this.activeNavigationId = defaultNav[0].NavigationId;
        this.redirectInternalNav(defaultNav[0]);
      } else {

        this.activeNavigationId = this.navigationList[0].NavigationId;
        this.redirectInternalNav(this.navigationList[0]);
      }

      this.auth.setLocalStorage('DefaultNavigationId', this.activeNavigationId);
    } else {

      this.navigationList = []
    }

    this.navigationList = [...this.navigationList]
  }

  switchApplication(app: MvApplication) {

    if (app) {

      this.defaultApplicationId = app.ApplicationId;
      this.acc.setUserDefault({ DefaultApplicationId: this.defaultApplicationId })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response) => {

          if (response && response?.Data && response?.Data[0]) {

            this.auth.setLocalStorage('Navigation', response?.Data[0]?.Navigation || []);
            this.auth.setLocalStorage('Role', response?.Data[0]?.Role || []);
            this.auth.setLocalStorage('DefaultApplicationId', response?.Data[0]?.DefaultApplicationId);
            this.auth.setLocalStorage('DefaultNavigationId', response?.Data[0]?.DefaultNavigationId);
            this.initToolbar();
            this.navigationChange();
            this.auth.subApplicationChanged.next(true);
          } else {

            this.us.openSnackBar('SwitchApplicationFailed', 'error');
          }
        });
    }
  }

  toggleSidenav() {

    this.sns.isNavigationPin = !this.sns.isNavigationPin;
    this.sns.toggleMenu(this.sns.isNavigationPin);

    this.acc.setUserSetting({ IsNavigationPin: this.sns.isNavigationPin })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {

        if (response && response?.Data && response?.Data[0]) {

          this.auth.setLocalStorage('IsNavigationPin', this.sns.isNavigationPin);
        }
      });
  }

  internalNavigationClick(nav: MvNavigation) {

    this.activeNavigationId = nav.NavigationId;
    this.auth.setLocalStorage('DefaultNavigationId', this.activeNavigationId);
    this.redirectInternalNav(nav);

    this.acc.setUserDefault({ DefaultNavigationId: nav.NavigationId })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response) {

          this.auth.setLocalStorage('Navigation', response?.Data[0]?.Navigation || [])
          this.auth.setLocalStorage('Role', response?.Data[0]?.Role || [])
        }
      });
  }

  redirectInternalNav(nav: MvNavigation) {

    this.router.navigateByUrl(`/${nav.Url}` || 'error/404', { skipLocationChange: false });
  }

  fullscreenClick() {

    this.isFullscreen = !this.isFullscreen;
    // let elem: any = document.documentElement;
    // let methodToBeInvoked = elem.requestFullscreen || elem.webkitRequestFullScreen || elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
    // if (methodToBeInvoked) {
    //   methodToBeInvoked.call(elem);
    // }
    if (this.isFullscreen) {

      document.documentElement.requestFullscreen();
    } else {

      document.exitFullscreen();
    }
  }

  notificationClick() {

    this.sns.isNotificationOpen = !this.sns.isNotificationOpen;
    this.sns.toggleNotification(this.sns.isNotificationOpen);
    this.sns.subNotificationChanged.next(this.sns.isNotificationOpen);
  }

  logout() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      panelClass: 'logout-dialog-wrapper',
      data: {
        title: 'Logout',
        message: 'WantToLogout',
        yesBtnText: 'Yes',
        noBtnText: 'No'
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response) {

          this.auth.logout();
        }
      });
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
