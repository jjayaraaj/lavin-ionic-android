import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, concat, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  categoryId;
  products: any[] = [];
  hideLoading = false;
  searchQuery: string;
  showSpinner = false;
  perPage = 0;
  page;
  featured = false;

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map((results: any) => {
          return {
            params: results[0].id,
            queryParams: results[1].page,
            perPage: results[1].per_page,
          };
        }),
        concatMap((res: any) => {
          let featured = false;
          this.perPage = res.perPage;
          if (res.queryParams === 'featured') {
            featured = true;
          } else {
            featured = false;
          }
          //  console.log(featured);
          this.hideLoading = false;
          return this.productService.getProducts(featured, res.perPage);
          // this.productService.getProducts()
        })
      )
      .subscribe((data: any) => {
        // console.log('Features', data);

        this.products = data;
        this.hideLoading = true;
      });
  }
  // ionViewWillEnter() {
  //   console.log('will enter');
  //   this.route.queryParams.subscribe((results) => {
  //     this.ngOnInit();
  //     console.log(results.page);
  //     console.log('products', this.products);
  //     this.hideLoading = true;
  //     this.perPage = results.per_page;
  //     this.page = results.page;
  //     if (this.page === 'featured') {
  //       this.featured = true;
  //     } else {
  //       this.featured = false;
  //     }
  //     console.log(this.featured);
  //   });
  // }

  ionViewDidLeave() {
    console.log('did leave');
    this.products = [];
    this.hideLoading = false;
  }
  onSearch(event: any) {
    this.showSpinner = true;
    const val = event.target.value;
    this.productService.getProductsBySearch(val).subscribe((data: any) => {
      this.showSpinner = false;
      this.products = data;
    });
  }
}
