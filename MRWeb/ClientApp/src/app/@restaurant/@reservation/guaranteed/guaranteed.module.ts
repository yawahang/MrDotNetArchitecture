import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuaranteedComponent } from './guaranteed.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GuaranteedComponent
  }
];

@NgModule({
  declarations: [
    GuaranteedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    GuaranteedComponent
  ]
})
export class GuaranteedModule {

}
