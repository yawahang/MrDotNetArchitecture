import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'financial',
                loadChildren: () => import('./financial-dashboard/financial-dashboard.module').then(m => m.FinancialDashboardModule)
            },
            {
                path: 'cash-management',
                loadChildren: () => import('./cash-management-dashboard/cash-management-dashboard.module').then(m => m.CashManagementDashboardModule)
            },
            {
                path: 'profit-loss',
                loadChildren: () => import('./profit-loss-dashboard/profit-loss-dashboard.module').then(m => m.ProfitLossDashboardModule)
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
export class AccountingDashboardModule {

}