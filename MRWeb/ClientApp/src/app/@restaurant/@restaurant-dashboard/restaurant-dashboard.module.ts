import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'reservations',
                loadChildren: () => import('./reservations-dashboard/reservations.module').then(m => m.ReservationsModule)
            },
            {
                path: 'orders',
                loadChildren: () => import('./orders-dashboard/orders-dashboard.module').then(m => m.OrdersDashboardModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customers-dashboard/customers-dashboard.module').then(m => m.CustomersDashboardModule)
            },
            {
                path: 'employee',
                loadChildren: () => import('./employee-dashboard/employee-dashboard.module').then(m => m.EmployeeDashboardModule)
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
export class RestaurantDashboardModule {

}