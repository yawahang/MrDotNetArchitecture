import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'executive',
                loadChildren: () => import('./executive-dashboard/executive-dashboard.module').then(m => m.ExecutiveDashboardModule)
            },
            {
                path: 'sales',
                loadChildren: () => import('./sales-dashboard/sales-dashboard.module').then(m => m.SalesDashboardModule)
            },
            {
                path: 'service',
                loadChildren: () => import('./service-dashboard/service-dashboard.module').then(m => m.ServiceDashboardModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardModule {

}