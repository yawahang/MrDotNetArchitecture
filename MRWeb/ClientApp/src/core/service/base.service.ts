import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private api: WebApiService) {

  }

  getInfo(): Observable<any> {

    return this.api.get('Base/Info', null, true, true);
  }

  getListItemList(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/ListItemList', param, showLoader, refresh);
  }

  getListItem(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/ListItem', param, showLoader, refresh);
  }

  setListItem(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Base/ListItemTsk', param, showLoader);
  }

  getListItemCategory(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/ListItemCategory', param, showLoader, refresh);
  }

  getListItemCategoryList(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/ListItemCategoryList', param, showLoader, refresh);
  }

  setListItemCategory(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Base/ListItemCategoryTsk', param, showLoader);
  }

  getRole(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/Role', param, showLoader, refresh);
  }

  getRoleNavigationAction(param: Object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/RoleNavigationAction', param, showLoader, refresh);
  }

  setRole(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Base/RoleTsk', param, showLoader);
  }

  getNavigationList(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/NavigationList', param, showLoader, refresh);
  }

  getApplicationList(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/ApplicationList', param, showLoader, refresh);
  }

  setRoleNavigationAction(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Base/RoleNavigationActionTsk', param, showLoader);
  }

  setCompany(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Business/CompanyTsk', param, showLoader);
  }

  getCompany(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Business/Company', param, showLoader, refresh);
  }

  setOffice(param: object, showLoader?: boolean): Observable<any> {

    return this.api.post('Business/OfficeTsk', param, showLoader);
  }

  getOffice(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Business/Office', param, showLoader, refresh);
  }

  getCulture(param: object, showLoader?: boolean, refresh = true): Observable<any> {

    return this.api.get('Base/Culture', param, showLoader, refresh);
  }

}
