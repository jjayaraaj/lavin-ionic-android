import { OrderService } from './../../services/order.service';
import { StorageService } from './../../services/storage.service';
import { CommonService } from './../../services/common.service';
import { AUthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username = '';
  password = '';
  returnPage;
  user: any;
  loggedIn = false;
  previousOrders: any[] = [];
  $userInfo = new BehaviorSubject(null);

  constructor(
    private authService: AUthService,
    private commonService: CommonService,
    private orderService: OrderService,
    private storageService: StorageService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
      // console.log(param.next);
      this.returnPage = param.next;
    });

    this.$userInfo = this.authService.user;
    this.checkLogin();
  }

  ionViewDidEnter() {
    console.log('check');
    this.checkLogin();
  }

  signIn(loginForm) {
    this.authService.authUser(this.username, this.password);
  }

  accountEdit(editMode) {}

  checkLogin() {
    this.storageService
      .getObject('userLogginInfo')
      .then((userLogginInfo: any) => {
        if (userLogginInfo != null) {
          this.user = userLogginInfo;
          this.loggedIn = true;

          console.log(userLogginInfo);

          this.getPreviousOrderDetails();
        } else {
          this.user = '';
          this.loggedIn = false;
        }
      });
  }

  getPreviousOrderDetails() {
    this.orderService
      .getPreviousOrderByCustomer(this.user.id)
      .subscribe((data: any) => {
        this.previousOrders = data;
      });
  }

  onClickLogout() {
    this.storageService.removeItem('userLogginInfo').then(() => {
      this.storageService.removeItem('cart').then(() => {});
      this.loggedIn = false;
    });
  }

  onClickForgot() {
    const openCapacitorSite = async () => {
      await Browser.open({ url: 'http://capacitorjs.com/' });
    };
  }
}
