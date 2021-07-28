import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessAccountsComponent } from './business-accounts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BusinessAccountsComponent
  }
];

@NgModule({
  declarations: [
    BusinessAccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    BusinessAccountsComponent
  ]
})
export class BusinessAccountsModule {

}
