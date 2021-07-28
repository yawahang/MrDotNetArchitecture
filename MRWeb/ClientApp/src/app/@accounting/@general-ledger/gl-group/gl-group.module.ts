import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlGroupComponent } from './gl-group.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GlGroupComponent
  }
];

@NgModule({
  declarations: [
    GlGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    GlGroupComponent
  ]
})
export class GlGroupModule {

}
