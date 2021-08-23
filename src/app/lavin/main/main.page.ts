import { ProductDetailComponent } from './../../components/product-detail/product-detail.component';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  featuredProducts: any = [];
  productCategories: any = [];
  products: any = [];
  searchQuery: string;
  showFeaturedSpinner = true;
  isLoading = false;
  bannerImage = environment.imageUrl + '1.jpg';

  constructor(
    private productService: ProductService,
    public route: Router,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.featuredProducts = data;
      this.isLoading = false;
    });
    this.productService.getProducts(false, 10).subscribe((data) => {
      this.products = data;
    });
  }

  onclickSeeAll(featured, perPage?) {
    this.route.navigateByUrl(
      `/lavin/tabs/product-list?page=${featured}&per_page=${perPage}`
    );
  }

  onClickCategory(category) {
    this.route.navigateByUrl(
      `/lavin/tabs/product-list?page=category&id=${category}`
    );
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
