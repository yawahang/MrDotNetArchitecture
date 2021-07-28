import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeReportComponent } from './je-report.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JeReportComponent
  }
];

@NgModule({
  declarations: [
    JeReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    JeReportComponent
  ]
})
export class JeReportModule {

}
