import { HeaderComponent } from './header.component';
import { SharedComponentModule } from './../../common/shared-component.module';
import { CategoriesComponent } from './../../components/categories/categories.component';
import { SharedDirectivesModule } from './../../directives/shared-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedDirectivesModule],
  declarations: [],
})
export class HeaderModule {}
