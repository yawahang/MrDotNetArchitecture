import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicReportComponent } from './dynamic-report.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DynamicReportComponent
  }
];

@NgModule({
  declarations: [
    DynamicReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DynamicReportComponent
  ]
})
export class DynamicReportModule {

}
