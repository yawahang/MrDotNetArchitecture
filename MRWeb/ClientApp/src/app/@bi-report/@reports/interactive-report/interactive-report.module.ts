import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractiveReportComponent } from './interactive-report.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InteractiveReportComponent
  }
];

@NgModule({
  declarations: [
    InteractiveReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    InteractiveReportComponent
  ]
})
export class InteractiveReportModule {

}
