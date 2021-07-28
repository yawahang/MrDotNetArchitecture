import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenOrdersComponent } from './kitchen-orders.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: KitchenOrdersComponent
  }
];

@NgModule({
  declarations: [
    KitchenOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    KitchenOrdersComponent
  ]
})
export class KitchenOrdersModule {

}
