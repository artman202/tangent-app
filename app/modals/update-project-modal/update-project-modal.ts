import { Component } from '@angular/core';
import { NavController, ViewController, Loading, Alert, NavParams} from 'ionic-angular';

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
  templateUrl: 'build/modals/update-project-modal/update-project-modal.html',
  providers: [ProjectsService]
})
export class UpdateProjectModal {

  private error: boolean;
  private tokenId: any;
  private loading: any;
  private project: any;

  constructor(private navCtrl: NavController,  private viewCtrl: ViewController, private projectsService: ProjectsService, private navParams: NavParams) { 
    this.tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));

    this.project = navParams.get('project');

    console.log(this.project);

  }

  validateField(variable,  errorValue) {
    if(this.project[variable] == null || this.project[variable] == undefined || this.project[variable] == '') {
      this.project[variable] = errorValue;
      this[variable+'Color'] = '#df4f66';
      this[variable+'Error'] = true;
      this.error = true;
    }
  }

  checkError(variable) {
    if(this[variable+'Error'] == true) {
      this.project[variable] = '';
      this[variable+'Color'] = 'black';
      this[variable+'Error'] = false;
    }
  }

  updateProject() {

    this.error = false;

    this.validateField('title', 'Please enter a title');
    this.validateField('start_date', '');
    this.validateField('end_date', '');
    this.validateField('description', 'Please enter a description');

    this.project.is_billable = JSON.parse(this.project.is_billable);
    this.project.is_active = JSON.parse(this.project.is_active);

    if(this.error == false) {

      this.presentLoadingDefault();

      this.projectsService.updateProject (this.project, this.tokenId.token)
        .subscribe(
          response  => {
            setTimeout(() => {
              this.close(true);
              this.loadingDismiss();
            }, 0);
            this.showToast('Project updated')
          },
          err => {
            setTimeout(() => {
              this.loadingDismiss();
            }, 0);
            setTimeout(() => {
              this.presentAlert('Project Update Failed', 'We apologise for not being able to process your request at this moment, please try again later');
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
