import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create/create-category.component';
import { EditCategoryComponent } from './edit/edit-category.component';
import { ShowCategoryComponent } from './show/show-category.component';

const routes: Routes = [
    { path: '', component: CategoriesComponent},
    { path: 'create', component: CreateCategoryComponent },
    { path: 'edit/:name', component: EditCategoryComponent },
    { path: 'show/:name', component: ShowCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
