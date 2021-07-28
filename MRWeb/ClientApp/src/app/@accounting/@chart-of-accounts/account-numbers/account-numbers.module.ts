import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountNumbersComponent } from './account-numbers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountNumbersComponent
  }
];

@NgModule({
  declarations: [
    AccountNumbersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    AccountNumbersComponent
  ]
})
export class AccountNumbersModule {

}
