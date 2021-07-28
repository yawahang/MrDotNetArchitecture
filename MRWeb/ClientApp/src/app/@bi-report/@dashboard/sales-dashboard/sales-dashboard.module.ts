import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDashboardComponent } from './sales-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTileModule } from 'src/shared/components/mat-tile/mat-tile.module';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';

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
