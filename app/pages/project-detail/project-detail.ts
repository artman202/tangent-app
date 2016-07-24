import { Component } from '@angular/core';
import { NavController, NavParams, Alert, Loading, Modal } from 'ionic-angular';

// Pages
import { UpdateProjectModal } from '../../modals/update-project-modal/update-project-modal';

// Native
import {Toast} from 'ionic-native';

// Services
import { ProjectsService } from '../../providers/projects-service/projects-service';

/*
  Generated class for the ProjectDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/project-detail/project-detail.html',
  providers: [ProjectsService]
})
export class ProjectDetailPage {

  private project: any;
  private projectTaskSet: any;
  private endDate: boolean;
  private tokenId: any;
  private loading: any;
  private alert: any;

  constructor(private navCtrl: NavController, public navParams: NavParams, public projectsService: ProjectsService) {

    this.tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));

    if(navParams.data.end_date == null || navParams.data.end_date == undefined || navParams.data.end_date == '') {
      this.endDate = false;
    } else {
      this.endDate = true;
    }

    this.project = navParams.data;
    this.projectTaskSet = this.project.task_set;

  }

  deleteProject(projectId) {

    let buttonsArr = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {

          let navTransition = this.alert.dismiss();
          // Reload content upon successful deletion

          // Show loading indicator
          this.presentLoadingDefault();
          
          this.projectsService.deleteProject(projectId, this.tokenId.token)
            .subscribe(
              response => {

              },
              err => {

                window.localStorage.setItem('reload', 'true');
                setTimeout(() => {
                  this.loadingDismiss();
                }, 0);
                
                // start some async method
                setTimeout(() => {
                  navTransition.then(() => {
                    this.navCtrl.pop();
                  });
                  this.showToast('Project deleted')
                }, 500);

              },
              () => console.log('Project delete request sent successfully')
            )

        }
      }
    ]

    this.presentAlert('Alert', 'Are you sure you want to delete this project?', buttonsArr)

  }

  presentAlert(alertTitle, alertMessage, buttonsArr) {
    this.alert = Alert.create({
      title: alertTitle,
      message: alertMessage,
      buttons: buttonsArr
    });
    this.navCtrl.present(this.alert);
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

  logError(err) {
    console.log(err);
  }

  showToast(content) {
    Toast.show(content, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  showModal() {
    let modal = Modal.create(UpdateProjectModal, {project: this.project});
    this.navCtrl.present(modal);
  }

}
