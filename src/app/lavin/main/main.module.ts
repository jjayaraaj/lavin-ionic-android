import { SharedComponentModule } from './../../common/shared-component.module';
import { CategoriesComponent } from './../../components/categories/categories.component';
import { SharedDirectivesModule } from './../../directives/shared-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    // SharedDirectivesModule,
    SharedComponentModule,
  ],
  declarations: [MainPage],
})
export class MainPageModule {}
