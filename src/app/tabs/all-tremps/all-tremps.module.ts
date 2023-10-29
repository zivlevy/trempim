import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTrempsPageRoutingModule } from './all-tremps-routing.module';

import { AllTrempsPage } from './all-tremps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTrempsPageRoutingModule
  ],
  declarations: [AllTrempsPage]
})
export class AllTrempsPageModule {}
