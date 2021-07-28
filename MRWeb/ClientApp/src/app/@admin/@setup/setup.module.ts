import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'role',
                loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
            },
            {
                path: 'list-item-category',
                loadChildren: () => import('./list-item-category/list-item-category.module').then(m => m.ListItemCategoryModule)
            },
            {
                path: 'list-item',
                loadChildren: () => import('./list-item/list-item.module').then(m => m.ListItemModule)
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
export class SetupModule {

}