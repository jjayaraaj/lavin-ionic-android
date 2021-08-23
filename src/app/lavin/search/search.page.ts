import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchQuery: string;
  products: any = [];
  isItemAvailable = false;
  items: any = [];
  showSpinner = false;
  showFeaturedSpinner = true;
  featuredProducts: any = [];
  productCategories: any = [];

  options = {
    slidesPerView: 3,
    spaceBetween: -10,
  };

  categories = {
    slidesPerView: 3.4,
    spaceBetween: -10,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  onSearch(event: any) {
    this.showSpinner = true;
    const val = event.target.value;
    this.productService.getProductsBySearch(val).subscribe((data: any) => {
      this.showSpinner = false;
      this.products = data;
    });
  }

  async onClickProduct(product) {
    // const modal = await this._modalCtrl.create({
    //   component: ProductDetailComponent,
    //   componentProps: {selectedProduct: product},
    //   cssClass: 'select-modal'});
    // return await modal.present();
  }

  searchProducts(): void {
    // this._productSer.getProductsBySearch(this.searchQuery).subscribe((data)=> {
    //   this.products = data;
    // });
  }

  onClickCategory(category) {
    // this.router.navigate(['product-list', category.id ]);
  }

  onclickSeeAll(featured, perPage) {
    // this.router.navigate(['/product-list'], { queryParams: { page: page } })
    this.router.navigateByUrl(
      `/lavin/tabs/product-list?page=${featured}&per_page=${perPage}`
    );
  }
}
