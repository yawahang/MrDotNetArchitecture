import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    outlet: 'mainOutlet'
  }
];

@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SalesComponent
  ]
})
export class SalesModule {

}
