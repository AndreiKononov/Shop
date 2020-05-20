import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductComponent {

    @Input()
    product: Product;

    @Output()
    addToCart: EventEmitter<void> = new EventEmitter();
}