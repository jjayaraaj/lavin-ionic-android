import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: any = [];

  constructor(
    private productService: ProductService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async onClickProduct(product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: { selectedProduct: product },
      cssClass: 'my-custom-modal-css',
    });

    return await modal.present();
  }
}
