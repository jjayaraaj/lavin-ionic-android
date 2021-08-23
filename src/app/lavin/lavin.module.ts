import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LavinPageRoutingModule } from './lavin-routing.module';

import { LavinPage } from './lavin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LavinPageRoutingModule
  ],
  declarations: [LavinPage]
})
export class LavinPageModule {}
