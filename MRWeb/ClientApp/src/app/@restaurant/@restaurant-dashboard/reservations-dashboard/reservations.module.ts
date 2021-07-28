import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent
  }
];

@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
  exports: [
    ReservationsComponent
  ]
})
export class ReservationsModule {

}
