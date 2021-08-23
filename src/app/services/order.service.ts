import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  postNewOrder(orderData) {
    console.log(orderData);
    return this.http.post(`${environment.apiEndpoint}order`, orderData);
  }

  getPreviousOrderByCustomer(userId) {
    const user = {
      userId,
    };
    return this.http.post(
      `${environment.apiEndpoint}order/previous_order`,
      user
    );
  }
  updateOrder(orderData) {
    return this.http.post(
      `${environment.apiEndpoint}order/update_order`,
      orderData
    );
  }
}
