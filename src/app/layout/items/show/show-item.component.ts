import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Item }    from './../item';
import { Router } from '@angular/router';
import { DDBService } from '../../../shared/services/ddb.service';
import { S3Service } from '../../../shared/services/s3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-show-item',
    templateUrl: './show-item.component.html',
    animations: [routerTransition()],
    providers: [DDBService,S3Service]
})
export class ShowItemComponent implements OnInit {

    category: string;
    name: string;
    public model = new Item('','');
    private sub: any;

    constructor(public router: Router,public ddbService: DDBService, private route: ActivatedRoute, public s3Service: S3Service) { }
    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {

         this.category = params['category']
         this.name = params['name'];

         this.ddbService.getItem({TableName:"item", Key:{category:this.category, name:this.name}}, (item) => {
             this.model.setAttributes(item)
         })
      });
    }

    delete() {
      if(confirm("Are you sure to delete "+name)) {
        this.s3Service.deleteFiles(this.model.getFileObjects(), () => {
            this.ddbService.deleteItem({TableName:"item", Key:{category:this.category, name:this.model.name}}, () => {
                this.router.navigateByUrl('/items')
            })
        })
      }
    }
}
