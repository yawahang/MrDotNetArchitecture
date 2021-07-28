import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialDashboardComponent } from './financial-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTileModule } from 'src/shared/components/mat-tile/mat-tile.module';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';

const routes: Routes = [
  {
    path: '',
    component: FinancialDashboardComponent
  }
];

@NgModule({
  declarations: [
    FinancialDashboardComponent
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
    FinancialDashboardComponent
  ]
})
export class FinancialDashboardModule {

}
