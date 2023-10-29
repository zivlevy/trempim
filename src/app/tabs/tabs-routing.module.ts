import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'my-trempim',
        loadChildren: () => import('./my-trempim/my-trempim.module').then( m => m.MyTrempimPageModule)
      },{
        path: 'all-tremps',
        loadChildren: () => import('./all-tremps/all-tremps.module').then( m => m.AllTrempsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/my-trempim',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/my-trempim',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
