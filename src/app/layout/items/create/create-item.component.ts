import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { Item }    from './../item';
import { DDBService } from '../../../shared/services/ddb.service';

@Component({
    selector: 'app-create-item',
    templateUrl: './create-item.component.html',
    animations: [routerTransition()],
    providers: [DDBService]
})
export class CreateItemComponent implements OnInit {

    model =  new Item('', '')
    formErrors = [];
    submitted = false;
    public categories = [];
    public mainImage;

    constructor(public router: Router,public ddbService: DDBService) { }
    ngOnInit() {
      this.ddbService.scanTable({TableName:"category"}, (list) => {
          this.categories = list
      })
    }

    onsubmit() {
      this.formErrors = this.model.formErrors()

      if(this.formErrors.length == 0) {
        if(this.model.keyphrases == null || this.model.keyphrases == "") {
          this.model.keyphrases = this.model.name
        }
        this.ddbService.createItem({TableName:"item", Item: this.model}, (item) => {
            this.model = item
            this.router.navigateByUrl('/items/edit/' + this.model.category + '/'+ this.model.name)
        })
      } else {
        console.log("errors " + this.formErrors)
      }
    }
}
