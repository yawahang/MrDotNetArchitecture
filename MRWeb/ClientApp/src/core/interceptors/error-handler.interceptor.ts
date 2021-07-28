import { AuthService } from 'src/core/service/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar,
        private auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {

                    if ([401, 403].includes(error.status) && this.auth.isTokenValid()) { // auto logout if 401 or 403 response returned from api
                        this.auth.logout();
                    }

                    console.error('================== ERROR==================');
                    console.error(error.message);
                    console.error('================== ERROR==================');
                    this.snackBar.open('Error: Something went wrong. Please try again!', 'x', {
                        duration: 5000,
                        panelClass: 'error',
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                    });
                    return throwError(error.message);
                })
            );
    }
}
