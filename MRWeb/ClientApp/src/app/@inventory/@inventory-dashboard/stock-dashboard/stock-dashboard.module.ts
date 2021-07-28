import { NavActionModule } from './../../../../shared/components/nav-action/nav-action.module';
import { MatTileModule } from './../../../../shared/components/mat-tile/mat-tile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDashboardComponent } from './stock-dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StockDashboardComponent
  }
];

@NgModule({
  declarations: [
    StockDashboardComponent
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
    StockDashboardComponent
  ]
})
export class StockDashboardModule {

}
