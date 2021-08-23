import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  productCategories: any = [];

  categories = {
    slidesPerView: 2.3,
    spaceBetween: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getCategoires();
  }

  onClickCategory(category) {
    // this.productService.getProductsByCategory(category);
    this.router.navigateByUrl(
      `/lavin/tabs/category-product?page=category&id=${category.id}`
    );
  }

  getCategoires() {
    this.productService.getAllCategories();
    this.productService.$categories.pipe(take(1)).subscribe((data) => {
      this.productCategories = data;
    });
  }
}
