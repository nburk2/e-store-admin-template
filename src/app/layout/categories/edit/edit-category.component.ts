import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Category }    from './../category';
import { Router } from '@angular/router';
import { DDBService } from '../../../shared/services/ddb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    animations: [routerTransition()],
    providers: [DDBService]
})
export class EditCategoryComponent implements OnInit {

    name: string;
    model =  new Category('')
    private sub: any;
    submitted = false;

    constructor(public router: Router,public ddbService: DDBService, private route: ActivatedRoute) { }
    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {

         this.name = params['name']; // (+) converts string 'id' to a number

         this.ddbService.getItem({TableName:"category", Key:{name:this.name}}, (item) => {
             this.model.setAttributes(item)
         })
      });
    }

    onsubmit() {
      this.ddbService.updateItem({TableName:"category", Key:{name:this.model.name}, AttributeUpdates: this.model.getAttributesMap()}, (item) => {
          this.router.navigateByUrl('/categories/show/' + this.model.name)
      })
      // this.submitted = true;
    }
}
