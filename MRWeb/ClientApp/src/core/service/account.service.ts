import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebApiService } from 'src/core/service/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api: WebApiService) {

  }

  login(param?: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Account/Login', param, showLoader);
  }

  setUserDefault(param?: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Account/UserDefaultUpd', param, showLoader);
  }

  getDataAccess(param?: object, showLoader?: boolean, refresh = true): Observable<any> {
    return this.api.get('Account/DataAccess', param, showLoader, refresh);
  }

  getNotification(param?: object, showLoader?: boolean, refresh = true): Observable<any> {
    return this.api.get('Account/Notification', param, showLoader, refresh);
  }

  setDataAccess(param?: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Account/DataAccessTsk', param, showLoader);
  }

  setUserRole(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Account/UserRoleTsk', param, showLoader);
  }

  getNavigationAction(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/NavigationAction', param, showLoader, refresh);
  }

  setUserSetting(param?: object, showLoader?: boolean, refresh = true) {

    return this.api.post('Account/UserSettingTsk', param, showLoader);
  }

  passwordResetTsk(param?: object, showLoader?: boolean) {

    return this.api.post('Account/PasswordResetTsk', param, showLoader);
  }

  getPasswordInfo(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/PasswordInfo', param, showLoader, refresh);
  }

  getUserInfo(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/UserInfo', param, showLoader, refresh);
  }

  getUser(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/UserList', param, showLoader, refresh);
  }

  getUserRole(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/UserRole', param, showLoader, refresh);
  }

  setUser(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Account/UserTsk', param, showLoader);
  }

  getExistingUsername(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Account/ExistingUsername', param, showLoader, refresh);
  }

  getUserProfile(param?: object, showLoader?: boolean, refresh = true): Observable<any> {
    return this.api.get('Account/UserProfile', param, showLoader, refresh);
  }

  userProfileUpd(param: object, showLoader?: boolean): Observable<any> {
    return this.api.post('Account/UserProfileUpd', param, showLoader);
  }

  profileImageUpd(param: object, showLoader?: boolean): Observable<any> {
    return this.api.post('Account/ProfileImageUpd', param, showLoader);
  }
}
