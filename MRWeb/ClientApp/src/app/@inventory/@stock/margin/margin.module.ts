import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarginComponent } from './margin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MarginComponent
  }
];

@NgModule({
  declarations: [
    MarginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    MarginComponent
  ]
})
export class MarginModule {

}
