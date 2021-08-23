import { CategoryProductsPageModule } from './../category-products/category-products.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LavinPage } from './lavin.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: LavinPage,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainPageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartPageModule),
      },

      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountPageModule),
      },
      {
        path: 'product-list',
        loadChildren: () =>
          import('./../product-list/product-list.module').then(
            (m) => m.ProductListPageModule
          ),
      },
      {
        path: 'category-product',
        loadChildren: () =>
          import('./../category-products/category-products.module').then(
            (m) => m.CategoryProductsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/lavin/tabs/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/lavin/tabs/main',
    pathMatch: 'full',
  },
  {
    path: 'product-detail',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LavinPageRoutingModule {}
