import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItems: any[] = [];
  $categories = new Subject<any>();
  cartCount = new BehaviorSubject<number>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.getCartCount();
  }

  getProducts(featured = true, perPage = 5) {
    //console.log(featured, perPage);
    return this.http.get(
      `${
        environment.apiEndpoint
      }products?featured=${featured}&per_page=${+perPage}`
    );
    // if (!featured) {
    //   return this.http.get(
    //     `http://localhost:3000/products?featured=${featured}&per_page=${+perPage}`
    //   );
    // } else {
    //   return this.http.get(
    //     `http://localhost:3000/products?per_page=${+perPage}`
    //   );
    // }
  }

  getAllCategories() {
    this.http
      .get(`${environment.apiEndpoint}category?per_page=10`)
      .pipe(
        map((data: any) => {
          const dataOrdered = data.sort((a, b) => {
            return a.menu_order - b.menu_order;
          });
          return dataOrdered;
        })
      )
      .subscribe((dataOrdered) => {
        this.$categories.next(dataOrdered);
      });
  }

  getProductsByCategory(category) {
    return this.http.get<any>(
      `${environment.apiEndpoint}category/products?categoryId=${category}`
    );
  }

  getCartCount() {
    this.cartCount.next(1);
    this.storageService.getObject('cart').then((data: any) => {
      this.cartItems = data;
      // console.log('cartcoiunt', this.cartItems);
      if (this.cartItems != null) {
        this.cartCount.next(this.cartItems.length);
      } else {
        //this.cartCount.next(0);
      }
    });
  }

  addItemInCart(product) {
    this.cartItems = product;

    this.cartCount.next(this.cartItems.length);
  }

  removeItemInCart(removed: boolean, item): void {
    this.storageService.getObject('cart').then((data: any) => {
      if (data == null || data.length === 0) {
        this.cartCount.next(0);
      }
    });

    if (removed) {
      // const removeItem = this.cartItems.filter( f=> f.id == item.product.id);
      const removeItem = this.cartItems.findIndex(
        (f) => f.product.id === item.product.id
      );

      if (removeItem) {
        console.log('no more items');
      }
      this.cartItems.splice(removeItem, 1);

      this.cartCount.next(this.cartItems.length);
    }
  }

  cartBadgeToZero() {
    this.cartCount.next(0);
  }

  getProductsBySearch(searchParams) {
    const search = {
      search: searchParams,
    };
    return this.http.get(
      `${environment.apiEndpoint}products/search?query=${searchParams}`
    );
  }
}
