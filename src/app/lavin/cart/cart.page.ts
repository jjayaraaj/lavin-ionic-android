import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';
import { ModalController } from '@ionic/angular';
import { CommonService } from './../../services/common.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage = false;
  addedQuantityInWords;
  quantity;

  quantityOptions = [
    { count: 1, value: '500gms' },
    { count: 2, value: '1 Kg' },
    { count: 3, value: '2 Kg' },
    { count: 4, value: '3 Kg' },
  ];

  constructor(
    private storageService: StorageService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    public router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.showEmptyCartMessage = false;
    this.total = 0.0;
    this.storageService
      .getObject('cart')
      .then((data: any) => {
        this.cartItems = data;
        // console.log('item', this.cartItems);
        if (this.cartItems != null && this.cartItems.length > 0) {
          this.cartItems.forEach((item, index) => {
            // this.quantity = item.qty;

            // item.qtyWords = this.addedQuantityInWords;

            this.total = this.total + item.product.price * item.qty;
          });
        } else {
          this.showEmptyCartMessage = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeItem(item, index) {
    const price = item.product.price;
    const qty = item.qty;
    let removed = false;

    this.cartItems.splice(index, 1);
    removed = true;
    this.productService.removeItemInCart(removed, item);
    this.storageService.setObject('cart', this.cartItems).then((data) => {
      this.total = this.total - price * qty;
    });

    if (this.cartItems.length === 0) {
      removed = false;
      this.showEmptyCartMessage = true;
      // this.productService.removeItemInCart(removed, item);
      console.log(this.showEmptyCartMessage);
    }
  }

  onSelectQuantity(item, i) {
    // console.log('onselect', this.quantity, i);
    this.addedQuantityInWords = this.commonService.getQuantityName(
      this.quantity
    );

    let price = 0;
    let qty = 0;

    price = parseFloat(item.product.price);
    qty = item.qty;

    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[i] = item;

    this.storageService.setObject('cart', this.cartItems).then((data: any) => {
      this.commonService.presentToast('updated');
    });

    // let price = 0;
    // price = parseFloat(item.price);

    // if (item.qty) {
    //   this.quantity = parseFloat(item.qty);
    // }

    // if (this.quantity < 0 && item.qty === 1) {
    //   return;
    // }

    // item.amount = this.quantity * price;

    // console.log(item.amount);

    // this.products = item;

    // console.log(this.products);
    // console.log(this.quantity);
  }

  checkout() {
    this.storageService.getObject('userLogginInfo').then((data: any) => {
      if (data != null) {
        this.router.navigate(['/checkout']);
      } else {
        //this.router.navigate(['/checkout']);
        this.router.navigate(['/lavin/tabs/account'], {
          queryParams: { next: 'checkout' },
        });
      }
    });
  }

  async modify(product, i) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: { selectedProduct: product.product },
      cssClass: 'my-custom-modal-css',
    });

    return await modal.present();
  }
}
