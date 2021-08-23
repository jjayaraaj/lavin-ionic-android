import { SharedComponentModule } from './../../common/shared-component.module';
import { CategoriesComponent } from './../../components/categories/categories.component';
import { SharedDirectivesModule } from './../../directives/shared-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SharedDirectivesModule,
    SharedComponentModule,
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
