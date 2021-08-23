import { ProductDetailComponent } from './../product-detail/product-detail.component';
import { ModalController } from '@ionic/angular';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @Input() perPage = 20;
  @Input() featured = false;

  products: any = [];

  constructor(
    private productService: ProductService,
    public modalCtrl: ModalController,
    private chg: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('products comp', this.featured, this.perPage);
    this.products = [];
    this.productService
      .getProducts(this.featured, this.perPage)
      .subscribe((data) => {
        this.products = data;
      });
  }

  chageDet() {
    console.log('chaj');
  }

  ngAfterViewInit() {
    console.log('pro');
  }

  async onClickProduct(product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: { selectedProduct: product },
      cssClass: 'my-custom-modal-css',
    });

    return await modal.present();
  }
}
