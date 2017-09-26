import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Category }    from './../category';
import { Router } from '@angular/router';
import { DDBService } from '../../../shared/services/ddb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-show-category',
    templateUrl: './show-category.component.html',
    animations: [routerTransition()],
    providers: [DDBService]
})
export class ShowCategoryComponent implements OnInit {

    name: string;
    public model = new Category('');
    private sub: any;

    constructor(public router: Router,public ddbService: DDBService, private route: ActivatedRoute) {}

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {

         this.name = params['name']; // (+) converts string 'id' to a number

         this.ddbService.getItem({TableName:"category", Key:{name:this.name}}, (item) => {
             this.model = item
         })
      });
    }

    delete() {
      if(confirm("Are you sure to delete "+name)) {
        this.ddbService.deleteItem({TableName:"category", Key:{name:this.model.name}}, () => {
            this.router.navigateByUrl('/categories')
        })
      }
    }

}
