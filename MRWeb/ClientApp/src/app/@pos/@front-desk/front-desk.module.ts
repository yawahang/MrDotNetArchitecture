import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'billing-order',
                loadChildren: () => import('./billing-order/billing-order.module').then(m => m.BillingOrderModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
            },
            {
                path: 'loyalty',
                loadChildren: () => import('./loyalty/loyalty.module').then(m => m.LoyaltyModule)
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
export class FrontDeskModule {

}