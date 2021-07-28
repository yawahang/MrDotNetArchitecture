import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'stock',
                loadChildren: () => import('./@stock/stock.module').then(m => m.StockModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./@inventory-dashboard/inventory-dashboard.module').then(m => m.InventoryDashboardModule)
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
export class InventoryModule {

}