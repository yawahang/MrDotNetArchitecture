import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorModule {

}
