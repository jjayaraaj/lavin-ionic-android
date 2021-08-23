import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { CommonService } from './../services/common.service';
import { AUthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

//for using razor pay
declare const Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  newOrder: any = {};
  paymentMethods: any[];
  paymentMethod: any;
  billingShippingSame = false;
  countries = 'India';
  states = 'Tamilnadu';
  selectedCountry;
  userInfo: any;
  showSPinner = false;
  paymentMethodSelected = false;
  isLoading = false;

  cities = [
    { cityCode: 'ayanavaram', value: 'Ayanavaram' },
    { cityCode: 'dharmapuri', value: 'Dharmapuri' },
    { cityCode: 'tiruvallur', value: 'Tiruvallur' },
  ];

  constructor(
    private storageService: StorageService,
    private authService: AUthService,
    private commonService: CommonService,
    private productService: ProductService,
    private orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit() {
    this.showSPinner = true;
    this.newOrder.billing = {};
    this.newOrder.shipping = {};

    this.paymentMethods = [
      // {payment_method: "bacs", payment_method_title: "Direct Bank Transfer"  },
      { paymentMethod: 'cod', paymentMethodTitle: 'Cash On Delivery' },
      {
        paymentMethod: 'razorpay',
        paymentMethodTitle: 'Credit / Debit Card /UPI',
      },
    ];

    //get user info from localstorage
    this.storageService
      .getObject('userLogginInfo')
      .then((userLogginInfo: any) => {
        this.userInfo = userLogginInfo;

        const email = userLogginInfo.email;
        this.authService.getCustomerByEmail(email).subscribe((data) => {
          const billingData = data[0].billing;
          billingData.country = this.countries;
          billingData.state = this.states;
          billingData.email = data[0].email;
          billingData.first_name = data[0].first_name;

          this.showSPinner = false;
          this.newOrder.billing = billingData;
          // console.log('data customer', this.newOrder.billing.phone);

          this.newOrder.shipping = data[0].shipping;
          this.newOrder.first_name = data[0].first_name;
          this.newOrder.last_name = data[0].last_name;
          this.newOrder.username = data[0].username;
          this.newOrder.email = data[0].email;
          this.newOrder.billing.email = data[0].email;
        });

        //   this._customerSer.getCustomerByEmail(email).subscribe( (data: any) => {

        //     this.showSPinner = false;
        //     console.log(data);

        //     this.newOrder.billing= data[0].billing;
        //     this.newOrder.shipping = data[0].shipping;
        //     this.newOrder.first_name = data[0].first_name;
        //     this.newOrder.last_name = data[0].last_name;
        //     this.newOrder.username = data[0].username;
        //     this.newOrder.email = data[0].email;

        //     this.newOrder.billing.email = data[0].email;

        //     // console.log("billing ",this.newOrder.billing);

        //  });
      });
  }

  setBillingtoSHipping() {
    this.billingShippingSame = !this.billingShippingSame;
    if (this.billingShippingSame) {
      this.newOrder.shipping = this.newOrder.billing;
    }
  }

  placeOrder() {
    this.isLoading = true;
    if (
      this.newOrder.billing.address_1 === '' ||
      this.newOrder.billing.city === '' ||
      this.newOrder.billing.phone === ''
    ) {
      this.commonService.presentAlert(
        'Error',
        '',
        'Please fill Address, City & Phone'
      );
      return;
    }

    const orderItems: any[] = [];
    let data: any = {};
    const shipping_lines = [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00',
      },
    ];

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.paymentMethod === this.paymentMethod) {
        paymentData = element;
      }
    });

    if (Object.keys(paymentData).length === 0) {
      this.paymentMethodSelected = true;
      this.isLoading = false;
      if (!this.isLoading) {
        this.commonService.dismissLoading();
      }
      this.commonService.presentToast('Please select payment method');
      return;
    }
    // this.commonService.presentLoading();

    data = {
      payment_method: paymentData.paymentMethod,
      payment_method_title: paymentData.paymentMethodTitle,
      set_paid: false,
      billing: this.newOrder.billing,
      shipping: this.newOrder.shipping,
      customer_id: this.userInfo.id || '',
      line_items: orderItems,
      shipping_lines,
    };

    if (paymentData.paymentMethod === 'razorpay') {
      this.commonService.presentLoading();
      this.storageService.getObject('cart').then((cart: any) => {
        let cartTotal = 0;
        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty,
          });
          cartTotal = cartTotal + element.product.price * element.qty;
        });

        data.line_items = orderItems;
        data.shipping_lines[0].total = cartTotal.toFixed(2);

        const orderData: any = {};
        orderData.order = data;

        this.orderService.postNewOrder(data).subscribe((datas: any) => {
          console.log('razor data ', datas);
          const totalFromCart = datas.shipping_lines[0].total;
          const options = {
            key: 'rzp_live_29sf0gYz9V3dF8',
            name: 'Lavin Sea Food',
            description: 'Lavin',
            amount: cartTotal * 100,
            currency: 'INR',
            //order_id: datas.id,

            handler: (response) => {
              //payment successfull
              this.commonService.presentToast('Payment Success');
              this.orderService.updateOrder(orderIdData).subscribe((res) => {
                this.storageService.removeItem('cart');
                this.productService.cartBadgeToZero();
                this.commonService.presentAlert(
                  'Order Placed Successfully',
                  '',
                  'Your order has been successfully placed. Your order number is data ' +
                    datas.id
                );
              });
              this.router.navigateByUrl('lavin/tabs/account');
            },
            prefill: {
              name: this.newOrder.billing.first_name,
              email: this.newOrder.billing.email,
              contact: this.newOrder.billing.phone,
            },
            theme: {
              color: '#cccc',
            },
          };
          const orderIdData = {
            orderId: datas.id,
          };

          this.initPay(options);
          // this.commonService.dismissLoading();
        });
      });
    } else {
      this.commonService.presentLoading();
      this.storageService
        .getObject('cart')
        .then((cart: any) => {
          if (!cart) {
            this.commonService.presentAlert('Empyt', '', 'Your Cart is empty');
            this.commonService.dismissLoading();
            return;
          }

          cart.forEach((element, index) => {
            orderItems.push({
              product_id: element.product.id,
              quantity: element.qty,
            });
          });

          data.line_items = orderItems;
          console.log(data);

          const orderData: any = {};
          orderData.order = data;

          this.orderService.postNewOrder(data).subscribe((datas: any) => {
            // this.commonService.dismissLoading();
            this.storageService.removeItem('cart');
            this.productService.cartBadgeToZero();
            this.commonService.presentAlert(
              'Order Placed Successfully',
              '',
              'Your order has been successfully placed. Your order number is data ' +
                datas.id
            );
            this.router.navigateByUrl('lavin/tabs/account');
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  initPay(options) {
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
