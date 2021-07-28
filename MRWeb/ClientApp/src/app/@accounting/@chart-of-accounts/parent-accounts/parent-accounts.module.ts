import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentAccountsComponent } from './parent-accounts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ParentAccountsComponent
  }
];

@NgModule({
  declarations: [
    ParentAccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    ParentAccountsComponent
  ]
})
export class ParentAccountsModule {

}
