import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/core/service/auth.service';
import { CustomIconService } from 'src/core/service/custom-icon.service';
import { ThemingService } from 'src/core/service/themimg.service';
import { AppConst } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @HostBinding('class') public cssClass: string;
  isAuthenticated = false;
  isLogin = false;

  constructor(public auth: AuthService,
    public cis: CustomIconService,
    private translate: TranslateService,
    private ths: ThemingService,
    private overlay: OverlayContainer,
    private router: Router) {

    this._unsubscribeAll = new Subject();
    translate.addLangs(this.auth.getLocalStorage('CultureList') || AppConst.Data.CultureList);
    const currentLang = this.auth.getLocalStorage('Culture');
    translate.use(currentLang || AppConst.Data.Culture);

    router.events
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((event) => {

        if (event instanceof NavigationEnd) {

          if (event.urlAfterRedirects.includes('/login')) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }

          if ((!event.urlAfterRedirects.includes('/login')) && this.auth.isTokenValid()) {

            this.auth.subAuthenticated.next(true);
          } else {

            this.auth.subAuthenticated.next(false);
          }
        }

        if (event instanceof NavigationError) {

          console.error('================ NavigationError ================');
          console.log(event.error);
          console.error('================ NavigationError ================');
        }
      });
  }

  ngOnInit() {

    this.cis.register();
    this.ths.theme
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((theme: string) => {
        this.cssClass = theme;
        this.applyThemeOnOverlays();
      });

    this.isAuthenticated = this.auth.isTokenValid();
    this.auth.subAuthenticated
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.isAuthenticated = this.auth.isTokenValid();
      });

    // this.auth.subAuthenticated.subscribe({
    //   next:() =>{
    //   },
    //   complete:()=>{
    //   }
    // });
  }

  applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlay.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.ths.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  // close form dialog if exists on window Esc key press
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event) {

      event.preventDefault(); // prevent escape also for fullscreen
      const closeBtns = document.getElementsByClassName('closeFormId');
      if (closeBtns && closeBtns.length > 0) {

        const closeBtn: HTMLElement = document.getElementsByClassName('closeFormId')[closeBtns.length - 1] as HTMLElement;
        closeBtn.click();
      }
    }
  }

  // open add form dialog if exists on window Ctrl + A key press
  @HostListener('document:keydown.control.a', ['$event'])
  handleCtrlAKey(event: KeyboardEvent) {
    if (event) {

      const formKeyIds = document.getElementsByClassName('formKeyId'); // if form already open
      if (!formKeyIds || formKeyIds.length === 0) {

        const addBtns = document.getElementsByClassName('addFormId');
        if (addBtns && addBtns.length > 0) {

          event.preventDefault();
          const addBtn: HTMLElement = document.getElementsByClassName('addFormId')[addBtns.length - 1] as HTMLElement;
          addBtn.click();
        }
      }
    }
  }

  // open edit form dialog if exists on window Ctrl + E key press
  @HostListener('document:keydown.control.e', ['$event'])
  handleCtrlEKey(event: KeyboardEvent) {
    if (event) {

      const formKeyIds = document.getElementsByClassName('formKeyId'); // if form already open
      if (!formKeyIds || formKeyIds.length === 0) {

        const editBtns = document.getElementsByClassName('editFormId');
        if (editBtns && editBtns.length > 0) {

          event.preventDefault();
          const editBtn: HTMLElement = document.getElementsByClassName('editFormId')[editBtns.length - 1] as HTMLElement;
          editBtn.click();
        }
      }
    }
  }

  // open data access dialog on window Ctrl + A key press
  @HostListener('document:keydown.control.d', ['$event'])
  handleCtrlDKey(event: KeyboardEvent) {
    if (event) {

      let control = document.getElementsByClassName('dataAccessKeyId');
      if (control && control.length > 0) {

        event.preventDefault();
        const controlBtn: HTMLElement = document.getElementsByClassName('dataAccessKeyId')[control.length - 1] as HTMLElement;
        controlBtn.click();
      }
    }
  }

  // open role switch dialog on window Ctrl + R key press
  @HostListener('document:keydown.control.r', ['$event'])
  handleCtrlRKey(event: KeyboardEvent) {
    if (event) {

      let control = document.getElementsByClassName('switchRoleKeyId');
      if (control && control.length > 0) {

        event.preventDefault();
        const controlBtn: HTMLElement = document.getElementsByClassName('switchRoleKeyId')[control.length - 1] as HTMLElement;
        controlBtn.click();
      }
    }
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

