import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar, Keyboard} from 'ionic-native';
import {LoginPage} from './pages/login/login';

import {HomePage} from './pages/home/home';
import {ProjectDetailPage} from './pages/project-detail/project-detail';


@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar left>
        <ion-title >Menu</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <button ion-item (click)="logoutUserOut()">
            Logout
          </button>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private menu:MenuController) {
    
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByName('black');
      Keyboard.hideKeyboardAccessoryBar(false);
    });
  }

  logoutUserOut() {
    window.sessionStorage.setItem("tokenid", '');
    this.rootPage = LoginPage;
  }
}

ionicBootstrap(MyApp);
