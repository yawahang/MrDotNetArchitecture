import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'employees',
                loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
            },
            {
                path: 'benefits',
                loadChildren: () => import('./benefits/benefits.module').then(m => m.BenefitsModule)
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
export class EmployeeModule {

}