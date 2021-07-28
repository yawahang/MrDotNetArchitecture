import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersDashboardComponent } from './orders-dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OrdersDashboardComponent
  }
];

@NgModule({
  declarations: [
    OrdersDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    OrdersDashboardComponent
  ]
})
export class OrdersDashboardModule {

}
