import { SharedDirectivesModule } from './../directives/shared-directives.module';
import { SharedComponentModule } from './../common/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryProductsPageRoutingModule } from './category-products-routing.module';

import { CategoryProductsPage } from './category-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryProductsPageRoutingModule,
    SharedComponentModule,
    SharedDirectivesModule,
  ],
  declarations: [CategoryProductsPage],
})
export class CategoryProductsPageModule {}
