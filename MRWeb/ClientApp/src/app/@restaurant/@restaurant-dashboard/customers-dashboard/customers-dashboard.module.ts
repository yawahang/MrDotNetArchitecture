import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersDashboardComponent } from './customers-dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CustomersDashboardComponent
  }
];

@NgModule({
  declarations: [
    CustomersDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    CustomersDashboardComponent
  ]
})
export class CustomersDashboardModule {

}
