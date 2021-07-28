import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitLossDashboardComponent } from './profit-loss-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTileModule } from 'src/shared/components/mat-tile/mat-tile.module';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';

const routes: Routes = [
  {
    path: '',
    component: ProfitLossDashboardComponent
  }
];

@NgModule({
  declarations: [
    ProfitLossDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTileModule,
    NavActionModule
  ],
  providers: [

  ],
  exports: [
    ProfitLossDashboardComponent
  ]
})
export class ProfitLossDashboardModule {

}
