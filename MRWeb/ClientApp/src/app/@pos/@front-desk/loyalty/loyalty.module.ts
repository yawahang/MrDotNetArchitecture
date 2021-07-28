import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyComponent } from './loyalty.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyComponent
  }
];

@NgModule({
  declarations: [
    LoyaltyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    LoyaltyComponent
  ]
})
export class LoyaltyModule {

}
