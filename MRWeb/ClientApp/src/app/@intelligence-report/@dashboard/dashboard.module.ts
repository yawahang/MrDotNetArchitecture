import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'executive',
                loadChildren: () => import('../@dashboard/executive/executive.module').then(m => m.ExecutiveModule)
            },
            {
                path: 'sales',
                loadChildren: () => import('../@dashboard/sales/sales.module').then(m => m.SalesModule)
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