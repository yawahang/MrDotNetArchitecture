import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./@accounting-dashboard/accounting-dashboard.module').then(m => m.AccountingDashboardModule)
            },
            {
                path: 'chart-of-accounts',
                loadChildren: () => import('./@chart-of-accounts/chart-of-accounts.module').then(m => m.ChartOfAccountsModule)
            },
            {
                path: 'general-ledger',
                loadChildren: () => import('./@general-ledger/general-ledger.module').then(m => m.GeneralLedgerModule)
            },
            {
                path: 'journal-entry',
                loadChildren: () => import('./@journal-entry/journal-entry.module').then(m => m.JournalEntryModule)
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
export class AccountingModule {

}