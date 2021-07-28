import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'tenant',
                loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule)
            },
            {
                path: 'company',
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
            },
            {
                path: 'office',
                loadChildren: () => import('./office/office.module').then(m => m.OfficeModule)
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
export class EntityModule {

}