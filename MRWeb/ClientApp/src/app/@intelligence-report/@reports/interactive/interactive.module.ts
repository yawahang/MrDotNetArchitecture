import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractiveComponent } from './interactive.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InteractiveComponent,
    outlet: 'mainOutlet'
  }
];

@NgModule({
  declarations: [
    InteractiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    InteractiveComponent
  ]
})
export class InteractiveModule {

}
