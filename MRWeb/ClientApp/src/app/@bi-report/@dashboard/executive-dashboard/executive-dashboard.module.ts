import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveDashboardComponent } from './executive-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTileModule } from 'src/shared/components/mat-tile/mat-tile.module';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';

const routes: Routes = [
  {
    path: '',
    component: ExecutiveDashboardComponent
  }
];

@NgModule({
  declarations: [
    ExecutiveDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTileModule,
    NavActionModule
  ],
  exports: [
    ExecutiveDashboardComponent
  ]
})
export class ExecutiveDashboardModule {

}
