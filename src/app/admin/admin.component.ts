import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    @Input() isDarkTheme: boolean;
    constructor() { }

    ngOnInit(): void {
    }

}
