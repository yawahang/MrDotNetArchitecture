import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRateComponent } from './product-rate.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductRateComponent
  }
];

@NgModule({
  declarations: [
    ProductRateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    ProductRateComponent
  ]
})
export class ProductRateModule {

}
