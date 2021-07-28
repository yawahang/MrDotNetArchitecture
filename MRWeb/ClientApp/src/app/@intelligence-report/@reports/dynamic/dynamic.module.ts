import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DynamicComponent,
    outlet: 'mainOutlet'
  }
];

@NgModule({
  declarations: [
    DynamicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DynamicComponent
  ]
})
export class DynamicModule {

}
