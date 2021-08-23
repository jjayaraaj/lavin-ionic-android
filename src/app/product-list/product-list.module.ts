import { SharedComponentModule } from './../common/shared-component.module';
import { SharedDirectivesModule } from './../directives/shared-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './product-list-routing.module';

import { ProductListPage } from './product-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    SharedDirectivesModule,
    SharedComponentModule,
  ],
  declarations: [ProductListPage],
})
export class ProductListPageModule {}
