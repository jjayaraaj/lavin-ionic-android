import { FormsModule } from '@angular/forms';
import { ProductComponent } from './../components/product/product.component';
import { ProductDetailComponent } from './../components/product-detail/product-detail.component';
import { ProductsComponent } from './../components/products/products.component';
import { HeaderComponent } from './../components/header/header.component';
import { CategoriesComponent } from './../components/categories/categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [
    CategoriesComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductComponent,
  ],
})
export class SharedComponentModule {}
