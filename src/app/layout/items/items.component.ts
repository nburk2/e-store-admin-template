import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Item }    from './item';
import { DDBService } from '../../shared/services/ddb.service';
// import {AlertsComponent} from '../layout.module';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    animations: [routerTransition()],
    providers: [DDBService]
})
export class ItemsComponent implements OnInit {

    public itemList
    public page = 1;
    public totalSize= 0;
    public lastKey = null

    constructor(public ddbService: DDBService) { }

    ngOnInit() {
      this.ddbService.scanTable({
        TableName:"item",
        // KeyConditionExpression: "#category = :category",
        // ExpressionAttributeNames:{
        //     "#category": "category"
        // },
        // ExpressionAttributeValues: {
        //     ":category": "category1"
        // }
    }, (list, key) => {
          this.lastKey = key
          this.itemList = list
          this.totalSize = list.length
      })
    }

}
