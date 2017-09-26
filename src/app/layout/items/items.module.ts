import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { CreateItemComponent } from './create/create-item.component';
import { EditItemComponent } from './edit/edit-item.component';
import { ShowItemComponent } from './show/show-item.component';
import { ItemNavigationComponent } from './navigation/item-header.component';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        CommonModule,
        ItemsRoutingModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ItemsComponent,
        CreateItemComponent,
        EditItemComponent,
        ShowItemComponent,
        ItemNavigationComponent
     ]
})
export class ItemsModule { }
