import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      const platformReady = await this.platform.ready();

      if (platformReady) {
        await StatusBar.hide();
        SplashScreen.hide();
      }
    } catch (ex) {
      console.log(ex);
    }

    // this.platform
    //   .ready()
    //   .then(() => {
    //     StatusBar.hide();
    //     // SplashScreen.hide();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
