import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'gl-group',
                loadChildren: () => import('./gl-group/gl-group.module').then(m => m.GlGroupModule)
            },
            {
                path: 'gl-item',
                loadChildren: () => import('./gl-item/gl-item.module').then(m => m.GlItemModule)
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
export class GeneralLedgerModule {

}