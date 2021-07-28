import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dynamic',
                loadChildren: () => import('../@reports/dynamic/dynamic.module').then(m => m.DynamicModule)
            },
            {
                path: 'interactive',
                loadChildren: () => import('../@reports/interactive/interactive.module').then(m => m.InteractiveModule)
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