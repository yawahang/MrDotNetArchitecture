import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'setup',
                loadChildren: () => import('./@setup/setup.module').then(m => m.SetupModule)
            },
            {
                path: 'entity',
                loadChildren: () => import('./@entity/entity.module').then(m => m.EntityModule)
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
export class AdminModule {

}