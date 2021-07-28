import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonGuaranteedComponent } from './non-guaranteed.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NonGuaranteedComponent
  }
];

@NgModule({
  declarations: [
    NonGuaranteedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    NonGuaranteedComponent
  ]
})
export class NonGuaranteedModule {

}
