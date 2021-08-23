import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lavin',
    loadChildren: () =>
      import('./lavin/lavin.module').then((m) => m.LavinPageModule),
  },
  {
    path: '',
    redirectTo: 'lavin',
    pathMatch: 'full',
  },
  {
    path: 'category-products',
    loadChildren: () =>
      import('./category-products/category-products.module').then(
        (m) => m.CategoryProductsPageModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
