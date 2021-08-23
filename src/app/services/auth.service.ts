import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AUthService {
  user = new BehaviorSubject(null);
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  authUser(username, password) {
    const userDetails = {
      username,
      password,
    };
    this.commonService.presentLoading();
    this.http
      .get(
        `https://lavinseafoods.in/api/auth/generate_auth_cookie/?username=${username}&password=${password}`
      )
      .subscribe(
        (data: any) => {
          this.commonService.dismissLoading();
          console.log(data);
          if (data.status === 'ok' && data.user) {
            console.log(data.user);
            this.setUSerInfo(data.user);
          } else {
            this.commonService.presentAlert(data.status, '', data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setUSerInfo(userInfo) {
    this.storageService.setObject('userLogginInfo', userInfo).then(() => {
      //  this._commonSer.dismissLoading();
      //  if(this.returnPage) {

      this.storageService.getObject('cart').then((data) => {
        if (data != null) {
          this.router.navigate(['/lavin/tabs/cart']);
        } else {
          this.router.navigate(['/lavin/tabs/main']);
        }
      });
      // }else{
      //  this.router.navigate(['/curry-guru/tabs/cart']);
      // }
    });
  }

  getCustomerByEmail(email) {
    const emailId = { email };
    console.log(emailId);
    return this.http.post(`${environment.apiEndpoint}customer/email`, emailId);
  }

  checkLogin() {
    this.storageService
      .getObject('userLogginInfo')
      .then((userLogginInfo: any) => {
        if (userLogginInfo != null) {
          // this.user = userLogginInfo;
          // console.log(userLogginInfo);
          this.user.next(userLogginInfo);
        } else {
          // this.user = '';
        }
      });
  }
}
