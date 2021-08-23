import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  async presentToast(message, duration: number = 2000) {
    console.log(duration);
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }

  async presentAlert(header = 'Error', subHeader = '', message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  dismissAler() {
    this.alertController.dismiss();
  }

  async presentLoading(message = 'Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
      duration: 5000,
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  getQuantityName(element) {
    let weights;
    switch (+element) {
      case 1:
        weights = '500 gms';
        // code block
        break;
      case 2:
        weights = '1 Kg';
        // code block
        break;
      case 3:
        weights = '1.5 Kg';
        // code block
        break;
      case 4:
        weights = '2 Kg';
        // code block
        break;
      default:
        // code block
        weights = 'none';
    }

    return weights;
  }
}
