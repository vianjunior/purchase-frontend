import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { PurchaseTaskComponent } from './views/purchase-task/purchase-task.component'
import { PurchaseListComponent } from './views/purchase-list/purchase-list.component'

const routes: Routes = [{
    path: "",
    component: HomeComponent
  },
  {
    path: "task/:type",
    component: PurchaseTaskComponent
  },
  {
    path: "task/:type/:id",
    component: PurchaseTaskComponent
  },
  {
    path: "pendingtasks/:type",
    component: PurchaseListComponent
  },
  {
    path: "list/:type",
    component: PurchaseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
