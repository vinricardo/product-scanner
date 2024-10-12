import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonAvatar, IonLabel, IonItem, IonBadge } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addCircle, barcode, notifications } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonBadge, IonItem, IonLabel, IonAvatar, IonIcon, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  private content: any;
  constructor() {
    addIcons({notifications,barcode,addCircle});
  }

  // ngAfterViewInit(): void {
  //   this.startScan();
  //   document.querySelector('body')!.classList.add('scanner-active');
  // }

  public async startScan(){
    
      // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      document.querySelector('body')!.classList.add('scanner-active');
      this.content = (result.content); // log the raw scanned content
      await BarcodeScanner.stopScan();
    }
  }
}
