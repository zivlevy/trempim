import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTrempimPageRoutingModule } from './my-trempim-routing.module';

import { MyTrempimPage } from './my-trempim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTrempimPageRoutingModule
  ],
  declarations: [MyTrempimPage]
})
export class MyTrempimPageModule {}
