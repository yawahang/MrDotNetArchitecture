import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../service/http-cache.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    public ds: DeviceDetectorService,
    private auth: AuthService,
    private cacheService: HttpCacheService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = this.getRequestWithHeaders(req);
    return this.sendRequest(authReq, next);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap((event: any) => {

      // pass along non-cacheable requests and invalidate cache  
      if (req.method !== 'GET') {

        return next.handle(req);
      }

      // attempt to retrieve a cached response  
      // return cached response  
      const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
      if (cachedResponse) {
        return of(cachedResponse);
      }

      if (event instanceof HttpResponse) {
        this.cacheService.get(req.url);
      }
    }));
  }

  getRequestWithHeaders(req: HttpRequest<any>): any {

    let headers = req.headers;

    const token = this.auth.getLocalStorage('AccessToken');
    const orgCode = this.auth.getLocalStorage('OrgCode');

    if (token) {

      headers = headers.set('Authorization', 'Bearer ' + token);
      let sessionHeaderParams: any = sessionStorage.getItem('HeaderParams');
      sessionHeaderParams = JSON.parse(sessionHeaderParams || '{}');
      sessionHeaderParams['OrgCode'] = orgCode;
      headers = headers.set('HeaderParams', JSON.stringify(sessionHeaderParams));
      sessionStorage.setItem('HeaderParams', JSON.stringify(sessionHeaderParams));
    }

    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');
    headers = headers.set('Access-Control-Allow-Methods', 'GET, POST');

    if (headers.get('Content-Type') === 'angular/auto') {

      headers = headers.delete('Content-Type');
    } else {

      headers = headers.set('Content-Type', 'application/json; charset=UTF-8');
    }

    return req.clone({ headers });
  }
}
