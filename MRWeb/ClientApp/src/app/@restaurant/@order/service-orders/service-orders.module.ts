import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceOrdersComponent } from './service-orders.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ServiceOrdersComponent
  }
];

@NgModule({
  declarations: [
    ServiceOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    ServiceOrdersComponent
  ]
})
export class ServiceOrdersModule {

}
