import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlItemComponent } from './gl-item.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GlItemComponent
  }
];

@NgModule({
  declarations: [
    GlItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    GlItemComponent
  ]
})
export class GlItemModule {

}
