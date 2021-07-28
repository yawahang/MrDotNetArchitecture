import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'orders',
                loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'kitchen-orders',
                loadChildren: () => import('./kitchen-orders/kitchen-orders.module').then(m => m.KitchenOrdersModule)
            },
            {
                path: 'service-orders',
                loadChildren: () => import('./service-orders/service-orders.module').then(m => m.ServiceOrdersModule)
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
export class OrderModule {

}