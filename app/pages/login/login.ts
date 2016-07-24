import { Component } from '@angular/core';
import { NavController, Loading, MenuController } from 'ionic-angular';

// Native
import {Toast} from 'ionic-native';

// Pages
import { HomePage } from '../home/home';

// Services
import { LoginService } from '../../providers/login-service/login-service';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService]
})
export class LoginPage {

  private username: string;
  private password: string;
  private loginCred: boolean;
  private loginErr: boolean;
  private loading: any;

  constructor(private navCtrl: NavController, private loginService: LoginService, private menu: MenuController) {
    this.menu.swipeEnable(false);
  }

  login() {

    this.loginCred = false;
    this.loginErr = false;

    // Show loading
    this.presentLoadingDefault()

    let userObj = {
      username: this.username,
      password: this.password
    }

    this.loginService.loginUser(userObj)
      .subscribe(
        response  => {
          window.sessionStorage.setItem("tokenid", JSON.stringify(response));
          setTimeout(() => {
            this.loading.dismiss();
          }, 0);
          setTimeout(() => {
            this.navCtrl.setRoot(HomePage);
          }, 500);
          this.showToast('Login successful')
        },
        err => {
          this.logError(err);
          setTimeout(() => {
            this.loading.dismiss();
          }, 0);
        },
        () => console.log('User Object sent successfully')
      );

  }

  logError(err) {

    let errBody = JSON.parse(err._body);
    console.log(errBody.non_field_errors);

    if(errBody.non_field_errors[0] == "Unable to login with provided credentials.") {
      this.loginCred = true;
    } else {
      this.loginErr = true;
    }

    console.log(err);

  }

  presentLoadingDefault() {
    this.loading = Loading.create({
      content: 'Please wait...'
    });

    this.navCtrl.present(this.loading);
  }

  showToast(content) {
    Toast.show(content, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
