import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveComponent } from './executive.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExecutiveComponent,
    outlet: 'mainOutlet'
  }
];

@NgModule({
  declarations: [
    ExecutiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExecutiveComponent
  ]
})
export class ExecutiveModule {

}
