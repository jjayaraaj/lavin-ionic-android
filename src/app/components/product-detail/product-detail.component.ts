import { FormsModule } from '@angular/forms';
import { CommonService } from './../../services/common.service';
import { StorageService } from './../../services/storage.service';
import { ProductService } from './../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() selectedProduct;
  cartData = [];
  showFooter = false;
  qty: number;
  total = 0;
  weight: any = [];
  weightOption = false;

  products: any;
  productPrice = 0;
  quantity = 1;
  addedQuantity;
  showAlreadyAddedToCart = false;
  selectedQty = false;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    public router: Router,
    public storageService: StorageService,
    public toastCtrl: ToastController,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    if (this.selectedProduct.attributes.length >= 1) {
      this.weight = this.selectedProduct.attributes[0].options;

      if (this.weight.length > 1) {
        this.weightOption = true;
      }
    }
    this.products = this.selectedProduct;
    this.productPrice = parseFloat(this.products.price);

    this.storageService.getObject('cart').then((data: any) => {
      console.log(data);
      if (data != null && data.length !== 0) {
        this.showFooter = true;
        this.qty = data.length;

        data.forEach((element) => {
          this.total += element.amount;
          if (this.products.id === element.product.id) {
            console.log(element.qty);
            this.showAlreadyAddedToCart = true;
            // let weights;

            this.addedQuantity = this.commonService.getQuantityName(
              element.qty
            );
          }
        });
      }
    });
  }

  ionViewWillEnter() {
    this.selectedQty = false;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl
      .dismiss({
        dismissed: true,
      })
      .then(() => {});
  }

  onClickAdd(product) {
    //if cart is empty
    this.storageService.getObject('cart').then((data: any) => {
      if (data == null || data.length === 0) {
        data = [];

        data.push({
          product,
          qty: this.quantity,
          amount: this.quantity * parseFloat(product.price),
          qtyWords: this.commonService.getQuantityName(this.quantity),
        });

        this.productService.addItemInCart(data);
        console.log('newly added', product);
      } else {
        let added = 0;

        data.forEach((element, i) => {
          if (product.id === element.product.id) {
            const qty = element.qty;
            data[i].qty = this.quantity;
            // data[i].amount =
            //   parseFloat(element.amount) + parseFloat(element.product.price);
            data[i].amount = this.quantity * parseFloat(element.product.price);
            data[i].qtyWords = this.commonService.getQuantityName(
              this.quantity
            );
            added = 1;
            console.log('Product has already been added', element);
          }
        });

        console.log(data);

        // for (let i = 0; i < data.length; i++) {
        //   if (product.id == data[i].product.id) {
        //     let qty = data[i].qty;
        //     data[i].qty = parseInt(qty) + this.quantity;
        //     console.log(data[i].qty);
        //     data[i].amount =
        //       parseFloat(data[i].amount) + parseFloat(data[i].product.price);
        //     added = 1;
        //     console.log('Product has already been added');
        //   }
        // }

        //if item is not added in cart
        if (added === 0) {
          data.push({
            product,
            qty: this.quantity,
            //weight: 1kg
            amount: parseFloat(product.price) * this.quantity,
            qtyWords: this.commonService.getQuantityName(this.quantity),
          });
          console.log('to be added', data);
        }
        this.productService.addItemInCart(data);
      }

      this.storageService.setObject('cart', data).then(() => {
        // this._commonSer.presentToast('Item added to cart');
        this.commonService.presentToast('Item added to cart');
        //  this.dismiss();
        //this._commonSer.presentToast('Product has been succeffully added to cart')
      });
    });
  }

  gotoCart(): void {}

  changeQty(item, change) {
    let price = 0;
    let qty;
    this.quantity = 0;

    price = parseFloat(item.price);
    if (item.qty) {
      qty = parseFloat(item.qty);
    }
    //qty = parseFloat(item.qty);

    if (change < 0 && item.qty === 1) {
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;
    console.log(qty);
    this.products = item;
    this.quantity = qty;
  }

  onSelectQuantity(item) {
    console.log(this.quantity);
    this.addedQuantity = this.commonService.getQuantityName(this.quantity);
    let price = 0;
    price = parseFloat(item.price);

    if (item.qty) {
      this.quantity = parseFloat(item.qty);
    }

    if (this.quantity < 0 && item.qty === 1) {
      return;
    }

    this.selectedQty = true;

    item.amount = this.quantity * price;
    item.qtyWords = this.addedQuantity;

    console.log(item.qtyWords);

    this.products = item;

    console.log(this.products);
    console.log(this.quantity);
  }
}
