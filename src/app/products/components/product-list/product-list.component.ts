import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, ProductsState, selectProductsState, selectProductsData, selectProductsError } from '../../../core/@ngrx';

import { Product, ProductModel } from '../../models/product.model';
import * as ProductAction from './../../../core/@ngrx/products/products.actions'
// import { ProductService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    // products: Observable<Product[]>;
    productState$: Observable<ProductsState>;
    products$: Observable<ReadonlyArray<ProductModel>>;
    // productsError$: Observable<Error | string>;
    @Input() editable: boolean;

    constructor(
        // public productService: ProductService,
        public cartService: CartService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        console.log('We have a store! ', this.store);
        // this.products = this.productService.getProducts();
        this.products$ = this.store.pipe(select(selectProductsData));
        this.productState$ = this.store.pipe(select(selectProductsState));
        // this.products$ = this.store.pipe(select(selectProductsData));
        // this.productsError$ = this.store.pipe(select(selectProductsError));
        this.store.dispatch(ProductAction.getProducts());

    }

    onBuyProduct(product: Product): void {
        this.cartService.addProduct(product);
    }

    onGoToProduct(product: Product): void {
        const link = ['/product', product.id];
        this.store.dispatch(RouterActions.go({
            path: link
        }));
    }

    onEditProduct(product: Product): void {
        const link = ['/admin/products/edit', product.id];
        this.store.dispatch(RouterActions.go({
            path: link
        }));
    }

    onDeleteProduct(product: Product): void {
        const productToDelete: ProductModel = { ...product };
        this.store.dispatch(ProductAction.deleteProduct({ product: productToDelete }));
    }
}
