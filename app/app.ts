import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';

import {HomePage} from './pages/home/home';
import {ProjectDetailPage} from './pages/project-detail/project-detail';


@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <button ion-item (click)="openPage(loginPage)">
            Login
          </button>
          <button ion-item (click)="openPage(signupPage)">
            Signup
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
    // this.rootPage = LoginPage;
    this.rootPage = ProjectDetailPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
