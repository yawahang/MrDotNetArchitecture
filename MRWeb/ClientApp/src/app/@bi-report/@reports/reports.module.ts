import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dynamic',
                loadChildren: () => import('./dynamic-report/dynamic-report.module').then(m => m.DynamicReportModule)
            },
            {
                path: 'interactive',
                loadChildren: () => import('./interactive-report/interactive-report.module').then(m => m.InteractiveReportModule)
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
export class ReportsModule {

}