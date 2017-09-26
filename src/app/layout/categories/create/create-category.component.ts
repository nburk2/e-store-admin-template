import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { Category }    from './../category';
import { DDBService } from '../../../shared/services/ddb.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    animations: [routerTransition()],
    providers: [DDBService]
})
export class CreateCategoryComponent implements OnInit {

  model =  new Category('')
  formErrors = [];
  submitted = false;

    constructor(public router: Router,public ddbService: DDBService) { }
    ngOnInit() {
      this.model.searchable = false
    }

    onsubmit() {
      this.formErrors = this.model.formErrors()
      if(this.formErrors.length == 0) {
        this.ddbService.createItem({TableName:"category", Item: this.model}, (item) => {
            this.model = item
            this.router.navigateByUrl('/categories/show/' + this.model.name)
        })
      } else {
        console.log("errors " + this.formErrors)
      }
    }
}
