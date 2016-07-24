import { Component } from '@angular/core';
import { NavController, ViewController, Loading, Alert } from 'ionic-angular';

// Native
import {Toast} from 'ionic-native';

// Services
import { ProjectsService } from '../../providers/projects-service/projects-service';

/*
  Generated class for the CreateEditModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/create-project-modal/create-project-modal.html',
  providers: [ProjectsService]
})
export class CreateProjectModal {

  private title: string;
  private start_date: string;
  private end_date: string;
  private is_billable = 'true';
  private is_active = 'true';
  private description: string;
  private error: boolean;
  private tokenId: any;
  private loading: any;

  constructor(private navCtrl: NavController,  private viewCtrl: ViewController, private projectsService: ProjectsService) { 
    this.tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));
  }

  validateField(variable,  errorValue) {

    if(this[variable] == null || this[variable] == undefined || this[variable] == '') {
      this[variable] = errorValue;
      this[variable+'Color'] = '#df4f66';
      this[variable+'Error'] = true;
      this.error = true;
    }
    
  }

  checkError(variable) {
    if(this[variable+'Error'] == true) {
      this[variable] = '';
      this[variable+'Color'] = 'black';
      this[variable+'Error'] = false;
    }
  }

  createProject() {

    this.error = false;

    this.validateField('title', 'Please enter a title');
    this.validateField('start_date', '');
    this.validateField('end_date', '');
    this.validateField('description', 'Please enter a description');

    if(this.error == false) {

      this.presentLoadingDefault();

      let projectObj = {
        title: this.title,
        start_date: this.start_date,
        end_date: this.end_date,
        is_billable: JSON.parse(this.is_billable),
        is_active: JSON.parse(this.is_active),
        description: this.description
      }

      this.projectsService.createProject(projectObj, this.tokenId.token)
        .subscribe(
          response  => {
            setTimeout(() => {
              this.loadingDismiss();
            }, 0);
            setTimeout(() => {
              this.close(true);
            }, 500);
            this.showToast('Project created')
          },
          err => {
            setTimeout(() => {
              this.loadingDismiss();
            }, 0);
            setTimeout(() => {
              this.presentAlert('Project Creation Failed', 'We apologise for not being able to process your request at this moment, please try again later');
            }, 500);
            this.logError(err);
          },
          () => console.log('Projects create request sent successfully')
        );
    } else {
      this.presentAlert('Form Errors', 'Please fix the form errors before submitting again');
    }

  }

  close(param) {
    let data = param;
    this.viewCtrl.dismiss(data);
  }

  logError(err) {
    console.log(err);
  }

  presentLoadingDefault() {
    this.loading = Loading.create({
      content: 'Please wait...'
    });

    this.navCtrl.present(this.loading);
  }

  loadingDismiss() {
    this.loading.dismiss();
  }

  presentAlert(alertTitle, alertMessage) {
    let alert = Alert.create({
      title: alertTitle,
      message: alertMessage,
      buttons: ['Dismiss']
    });
    this.navCtrl.present(alert);
  }

  showToast(content) {
    Toast.show(content, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
