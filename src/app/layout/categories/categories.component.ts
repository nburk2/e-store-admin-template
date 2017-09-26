import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Category }    from './category';
import { DDBService } from '../../shared/services/ddb.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    animations: [routerTransition()],
    providers: [DDBService]
})
export class CategoriesComponent implements OnInit {

    public categoryList

    constructor(public ddbService: DDBService) {}

    ngOnInit() {
      this.ddbService.scanTable({TableName:"category"}, (list) => {
          this.categoryList = list
      })
    }
}
