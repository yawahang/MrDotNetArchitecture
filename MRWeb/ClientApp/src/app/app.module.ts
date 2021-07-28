import { AppConst } from 'src/app/app.config';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlockUIPreventNavigation } from 'ng-block-ui/router';
import { ErrorHandlerInterceptor } from 'src/core/interceptors/error-handler.interceptor';
import { HttpRequestInterceptor } from 'src/core/interceptors/http-request.interceptor';
import { AuthService } from 'src/core/service/auth.service';
import { CustomIconService } from 'src/core/service/custom-icon.service';
import { UtilityService } from 'src/core/service/utility.service';
import { WebApiService } from 'src/core/service/web-api.service';
import { appRoutes } from './app.routing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SideNavModule } from './@main/sidenav/sidenav.module';
import { ToolbarModule } from './@main/toolbar/toolbar.module';
import { ThemingService } from 'src/core/service/themimg.service';
import { AppSplashscreenComponent } from './app.splash-screen.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AppSplashscreenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      delayStart: 0,
      delayStop: 300
    }),
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    DeviceDetectorModule.forRoot(),
    MatSnackBarModule,
    MatDialogModule,
    SideNavModule,
    ToolbarModule
  ],
  providers: [
    AppConst,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConst) => () => config.load(),
      deps: [AppConst],
      multi: true
    },
    ThemingService,
    AuthService,
    WebApiService,
    TranslateService,
    UtilityService,
    DeviceDetectorService,
    CustomIconService,
    BlockUIPreventNavigation,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
