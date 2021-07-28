import { NavActionModule } from './../../../../shared/components/nav-action/nav-action.module';
import { MatTileModule } from './../../../../shared/components/mat-tile/mat-tile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalesDashboardComponent } from './sales-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SalesDashboardComponent
  }
];

@NgModule({
  declarations: [
    SalesDashboardComponent
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
    SalesDashboardComponent
  ]
})
export class SalesDashboardModule {

}