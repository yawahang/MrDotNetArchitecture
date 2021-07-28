import { Routes } from '@angular/router';

export const errorRoutes: Routes = [{
  path: '404',
  loadChildren: () => import('./404/error-404.module').then(m => m.Error404Module)
},
{
  path: '503',
  loadChildren: () => import('./503/error-503.module').then(m => m.Error503Module)
},
{
  path: 'invalid-browser',
  loadChildren: () => import('./invalid-browser/invalid-browser.module').then(m => m.ErrorInvalidBrowserModule)
}];
