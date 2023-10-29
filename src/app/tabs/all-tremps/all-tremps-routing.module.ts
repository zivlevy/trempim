import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTrempsPage } from './all-tremps.page';

const routes: Routes = [
  {
    path: '',
    component: AllTrempsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTrempsPageRoutingModule {}
