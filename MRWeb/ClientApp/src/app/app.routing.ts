import { Routes } from '@angular/router';
import { AuthGuard } from 'src/core/helpers/auth-guard';
import { DeviceDetectorGuardService } from 'src/core/service/device-detector-guard.service';
import { BlockUIPreventNavigation } from 'ng-block-ui/router';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [BlockUIPreventNavigation],
        loadChildren: () => import('./@main/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'login/:OrgCode',
        canActivate: [BlockUIPreventNavigation],
        loadChildren: () => import('./@main/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'admin',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'inventory',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@inventory/inventory.module').then(m => m.InventoryModule)
    },
    {
        path: 'restaurant',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@restaurant/restaurant.module').then(m => m.RestaurantModule)
    },
    {
        path: 'pos',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@pos/pos.module').then(m => m.POSModule)
    },
    {
        path: 'bi',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@bi-report/bi-report.module').then(m => m.BIReportModule)
    },
    {
        path: 'accounting',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@accounting/accounting.module').then(m => m.AccountingModule)
    },
    {
        path: 'user-profile',
        canActivate: [DeviceDetectorGuardService, AuthGuard],
        loadChildren: () => import('./@main/user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./@main/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];