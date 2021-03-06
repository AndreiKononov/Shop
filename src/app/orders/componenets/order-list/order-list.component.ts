import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})

export class OrderListComponent implements OnInit {
    orders$: Observable<ReadonlyArray<Order>>;
    private ordersService: EntityCollectionService<Order>;

    constructor(entityServices: EntityServices) {
        this.ordersService = entityServices.getEntityCollectionService('Order');
    }

    ngOnInit(): void {
        this.orders$ = this.ordersService.entities$;
    }
}
