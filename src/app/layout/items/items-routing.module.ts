import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { CreateItemComponent } from './create/create-item.component';
import { EditItemComponent } from './edit/edit-item.component';
import { ShowItemComponent } from './show/show-item.component';

const routes: Routes = [
    { path: '', component: ItemsComponent},
    { path: 'create', component: CreateItemComponent },
    { path: 'edit/:category/:name', component: EditItemComponent },
    { path: 'show/:category/:name', component: ShowItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
