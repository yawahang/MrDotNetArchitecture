import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./@restaurant-dashboard/restaurant-dashboard.module').then(m => m.RestaurantDashboardModule)
            },
            {
                path: 'table',
                loadChildren: () => import('./@table/table.module').then(m => m.TableModule)
            },
            {
                path: 'reservation',
                loadChildren: () => import('./@reservation/reservation.module').then(m => m.ReservationModule)
            },
            {
                path: 'order',
                loadChildren: () => import('./@order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'customer',
                loadChildren: () => import('./@customer/customer.module').then(m => m.CustomerModule)
            },
            {
                path: 'employee',
                loadChildren: () => import('./@employee/employee.module').then(m => m.EmployeeModule)
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
export class RestaurantModule {

}