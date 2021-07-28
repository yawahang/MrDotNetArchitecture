import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'product',
                loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'product-rate',
                loadChildren: () => import('./product-rate/product-rate.module').then(m => m.ProductRateModule)
            },
            {
                path: 'margin',
                loadChildren: () => import('./margin/margin.module').then(m => m.MarginModule)
            },
            {
                path: 'discount-offers',
                loadChildren: () => import('./discount-offers/discount-offers.module').then(m => m.DiscountOffersModule)
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
export class StockModule {

}