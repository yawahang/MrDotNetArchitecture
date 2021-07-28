import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingOrderComponent } from './billing-order.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BillingOrderComponent
  }
];

@NgModule({
  declarations: [
    BillingOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    BillingOrderComponent
  ]
})
export class BillingOrderModule {

}
