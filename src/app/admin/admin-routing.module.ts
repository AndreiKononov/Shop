import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from 'src/app/core';
import { ProductFormComponent } from '../products/components';
import { ProductResolveGuard } from './guards';
import {
    AdminComponent,
    AdminDashboardComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
} from '.';
import { AuthGuard } from 'src/app/core';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: 'orders', component: ManageOrdersComponent },
                    { path: 'products', component: ManageProductsComponent },
                    {
                        path: 'products/add',
                        canDeactivate: [CanDeactivateGuard],
                        component: ProductFormComponent,
                    },
                    {
                        path: 'products/edit/:productID',
                        canDeactivate: [CanDeactivateGuard],
                        component: ProductFormComponent,
                        resolve: {
                            product: ProductResolveGuard,
                        },
                    },
                    { path: '', component: AdminDashboardComponent },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
    static components = [
        AdminComponent,
        AdminDashboardComponent,
        ManageProductsComponent,
        ManageOrdersComponent,
    ];
}
