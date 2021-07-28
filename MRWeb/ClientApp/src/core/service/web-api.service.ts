import { catchError, delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MvHttpOptions } from '../model/base.model';
import { AppConst } from 'src/app/app.config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  @BlockUI() blockUI: NgBlockUI;
  apiUrl: string;

  constructor(private http: HttpClient) {

    this.apiUrl = AppConst?.Data?.ApiUrl;
  }

  get(url: string, param?: object, showLoader = false, refresh = true): Observable<any> {

    if (showLoader && !this.blockUI.isActive) {

      this.blockUI.start();
    }

    const params = {} as MvHttpOptions;
    params.params = { Json: JSON.stringify(param) };

    return this.http.get(this.apiUrl + url, params).pipe(
      delay(1000),
      map(response => this.returnResponse(response, showLoader)),
      catchError((error) => {

        if (this.blockUI.isActive) {
          this.blockUI.stop();
        }

        return of(error);
      })
    );
  }

  post(url: string, param?: object, showLoader = false): Observable<any> {

    if (showLoader && !this.blockUI.isActive) {

      this.blockUI.start();
    }

    return this.http.post(this.apiUrl + url, { Json: param }).pipe(
      delay(300),
      map((response: any) => this.returnResponse(response, showLoader)),
      catchError((error) => {

        if (this.blockUI.isActive) {
          this.blockUI.stop();
        }

        return of(error);
      })
    );
  }

  private returnResponse(value: any, showLoader: boolean = true): any {

    if (showLoader && this.blockUI.isActive) {
      this.blockUI.reset();
    }

    return value;
  }
}
