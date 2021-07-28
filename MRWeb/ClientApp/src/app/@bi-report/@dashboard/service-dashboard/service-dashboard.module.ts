import { ServiceDashboardComponent } from './service-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTileModule } from 'src/shared/components/mat-tile/mat-tile.module';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';

const routes: Routes = [
  {
    path: '',
    component: ServiceDashboardComponent
  }
];

@NgModule({
  declarations: [
    ServiceDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTileModule,
    NavActionModule
  ],
  exports: [
    ServiceDashboardComponent
  ]
})
export class ServiceDashboardModule {

}
