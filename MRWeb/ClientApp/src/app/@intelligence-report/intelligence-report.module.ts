import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./@dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./@reports/reports.module').then(m => m.ReportsModule)
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
export class IntelligenceReportModule {

}