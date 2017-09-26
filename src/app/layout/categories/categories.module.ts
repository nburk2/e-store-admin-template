import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create/create-category.component';
import { EditCategoryComponent } from './edit/edit-category.component';
import { ShowCategoryComponent } from './show/show-category.component';
import { ItemNavigationComponent } from './navigation/item-header.component';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AlertsComponent } from '../../shared/modules/alerts/alerts.component';
// import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        CategoriesComponent,
        CreateCategoryComponent,
        EditCategoryComponent,
        ShowCategoryComponent,
        ItemNavigationComponent
     ]
})
export class CategoriesModule { }
