import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'guaranteed',
                loadChildren: () => import('./guaranteed/guaranteed.module').then(m => m.GuaranteedModule)
            },
            {
                path: 'non-guaranteed',
                loadChildren: () => import('./non-guaranteed/non-guaranteed.module').then(m => m.NonGuaranteedModule)
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
export class ReservationModule {

}