import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'parent-accounts',
                loadChildren: () => import('./parent-accounts/parent-accounts.module').then(m => m.ParentAccountsModule)
            },
            {
                path: 'business-accounts',
                loadChildren: () => import('./business-accounts/business-accounts.module').then(m => m.BusinessAccountsModule)
            },
            {
                path: 'account-numbers',
                loadChildren: () => import('./account-numbers/account-numbers.module').then(m => m.AccountNumbersModule)
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
export class ChartOfAccountsModule {

}