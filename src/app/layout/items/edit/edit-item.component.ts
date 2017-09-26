import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Item }    from './../item';
import { Router } from '@angular/router';
import { DDBService } from '../../../shared/services/ddb.service';
import { S3Service } from '../../../shared/services/s3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    animations: [routerTransition()],
    providers: [DDBService, S3Service]
})
export class EditItemComponent implements OnInit {

    category: string;
    name: string;
    model =  new Item('','')
    private sub: any;
    submitted = false;
    public categories = [];
    // formErrors = [];

    constructor(public router: Router,public ddbService: DDBService, private route: ActivatedRoute, public s3Service: S3Service) { }
    ngOnInit() {
      this.ddbService.scanTable({TableName:"category"}, (list) => {
          this.categories = list
      })
      this.sub = this.route.params.subscribe(params => {

         this.category = params['category']
         this.name = params['name']; // (+) converts string 'id' to a number

         this.ddbService.getItem({TableName:"item", Key:{category:this.category,name:this.name}}, (item) => {
             this.model.setAttributes(item)
         })
      });
    }

    onsubmit() {
      this.ddbService.updateItem({TableName:"item", Key:{category:this.category,name:this.name}, AttributeUpdates: this.model.getAttributesMap()}, (item) => {
          this.router.navigateByUrl('/items/show/' + this.model.category + "/" + this.model.name)
      })
      // this.submitted = true;
    }

    fileEvent(fileInput, type: string){
        let file = fileInput.target.files[0];
        let fileName = file.name;
        this.s3Service.uploadFile(file, this.model.name, type, (imageUrl) => {
            this.model[type] = imageUrl
            this.ddbService.updateItem({TableName:"item", Key:{category:this.category,name:this.name}, AttributeUpdates: this.model.getAttributesMap()}, (item) => {
                // this.router.navigateByUrl('/items/show/' + this.model.name)
            })
        })
    }
}
