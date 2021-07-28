import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountOffersComponent } from './discount-offers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DiscountOffersComponent
  }
];

@NgModule({
  declarations: [
    DiscountOffersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    DiscountOffersComponent
  ]
})
export class DiscountOffersModule {

}
