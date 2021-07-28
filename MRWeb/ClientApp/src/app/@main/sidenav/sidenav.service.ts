import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  subExternalNavChanged = new BehaviorSubject<boolean>(false);
  subNotificationChanged = new BehaviorSubject<boolean>(false);
  isNavigationPin = true;
  isNotificationOpen = false;

  private menuSideNav: MatSidenav;
  private notificationSideNav: MatSidenav;

  /**
   * Setter for sidenav.
   */
  public setMenu(sidenav: MatSidenav) {
    this.menuSideNav = sidenav;
  }

  public setNotification(sidenav: MatSidenav) {
    this.notificationSideNav = sidenav;
  }

  /**
   * Open this sidenav, and return a Promise that will resolve when it's fully opened (or get rejected if it didn't).
   *
   * @returns Promise<MatDrawerToggleResult>
   */
  public openMenu(): Promise<MatDrawerToggleResult> {
    return this.menuSideNav.open();
  }

  public openNotification(): Promise<MatDrawerToggleResult> {
    return this.notificationSideNav.open();
  }

  /**
   * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get rejected if it didn't).
   *
   * @returns Promise<MatDrawerToggleResult>
   */
  public closeMenu(): Promise<MatDrawerToggleResult> {
    return this.menuSideNav.close();
  }

  public closeNotification(): Promise<MatDrawerToggleResult> {
    return this.notificationSideNav.close();
  }

  /**
   * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or close() when it's closed.
   */
  public toggleMenu(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.menuSideNav.toggle(isOpen);
  }

  public toggleNotification(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.notificationSideNav.toggle(isOpen);
  }
}
