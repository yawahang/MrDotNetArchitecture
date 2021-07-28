import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'stock',
                loadChildren: () => import('./stock-dashboard/stock-dashboard.module').then(m => m.StockDashboardModule)
            },
            {
                path: 'sales',
                loadChildren: () => import('./sales-dashboard/sales-dashboard.module').then(m => m.SalesDashboardModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class InventoryDashboardModule {

}