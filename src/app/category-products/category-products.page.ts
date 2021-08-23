import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.page.html',
  styleUrls: ['./category-products.page.scss'],
})
export class CategoryProductsPage implements OnInit {
  showSpinner = false;
  hideLoading = false;
  products: any[] = [];
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit() {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map((results: any) => {
          return {
            params: results[0].id,
            queryParams: results[1].page,
            categoryId: results[1].id,
          };
        }),
        concatMap((res: any) => {
          console.log(res.categoryId);
          this.hideLoading = false;
          return this.productService.getProductsByCategory(res.categoryId);
        })
      )
      .subscribe((data: any) => {
        console.log('Features', data);

        this.products = data;
        this.hideLoading = true;
      });
  }
}
