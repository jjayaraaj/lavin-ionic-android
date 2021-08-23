import { environment } from './../../environments/environment';
import { StorageService } from './../services/storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AUthService } from '../services/auth.service';

@Component({
  selector: 'app-lavin',
  templateUrl: './lavin.page.html',
  styleUrls: ['./lavin.page.scss'],
})
export class LavinPage implements OnInit {
  cartCount$: Observable<number>;
  showCartBadge = false;
  cartnumber: number;

  bannerImage = environment.apiEndpoint + '/uploads/1.jpg';

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private authService: AUthService
  ) {}

  ngOnInit() {
    this.productService.getCartCount();

    this.cartCount$ = this.productService.cartCount;

    this.storageService
      .getObject('cart')
      .then((data: any) => {
        if (data != null) {
          this.showCartBadge = true;
          this.cartnumber = data.length;
          console.log(this.cartnumber);
        } else {
          // this.showCartBadge = false;
          this.productService.cartBadgeToZero();
        }
      })
      .catch((empty) => {});
    this.productService.cartCount.pipe(take(1)).subscribe((data) => {
      if (data <= 0) {
        //this.showCartBadge = false;
        this.cartnumber = data;
        console.log(this.cartnumber);
      } else {
        this.showCartBadge = true;
      }
    });

    // this.cartCount$.subscribe((data) => {
    //   if (data <= 0) {
    //     this.showCartBadge = false;
    //     this.cartnumber = data;
    //     console.log(this.cartnumber);
    //   } else {
    //     this.showCartBadge = true;
    //   }
    // });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');

    // this.storageService
    //   .getObject('userLogginInfo')
    //   .then((userLogginInfo: any) => {
    //     if (userLogginInfo != null) {
    //     } else {
    //     }
    //   });
  }
}
