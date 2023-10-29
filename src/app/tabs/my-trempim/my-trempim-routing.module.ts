import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTrempimPage } from './my-trempim.page';

const routes: Routes = [
  {
    path: '',
    component: MyTrempimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTrempimPageRoutingModule {}
