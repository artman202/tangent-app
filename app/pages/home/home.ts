import {Component} from '@angular/core';
import {Modal, NavController, Loading, NavParams} from 'ionic-angular';

// Page
import { ProjectDetailPage } from '../project-detail/project-detail';
import { CreateProjectModal } from '../../modals/create-project-modal/create-project-modal';

// Pipes
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate-pipe';

// Services
import { ProjectsService } from '../../providers/projects-service/projects-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ProjectsService],
  pipes: [TruncatePipe]
})
export class HomePage {

  private loading: any;
  private projectsArr: any;
  private projectDetailPage: any;
  private tokenId: any;

  ionViewDidEnter() {
    
    let reload = window.localStorage.getItem('reload');
    if(reload == 'true') {
      console.log('reload content');
      this.loadProjects(this.tokenId.token);
    }
    window.localStorage.setItem('reload', 'false');
  }

  constructor(private navCtrl: NavController, private projectsService: ProjectsService, public navParams: NavParams) {

    let tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));
    this.loadProjects(tokenId.token);

    this.projectDetailPage = ProjectDetailPage;

  }

  loadProjects(tokenid) {

    this.presentLoadingDefault();

    this.projectsService.loadProjects(tokenid)
      .subscribe(
        response  => {
          // remove
          console.log(response);
          response.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
          this.projectsArr = response;
          setTimeout(() => {
            this.loading.dismiss();
          }, 0);
        },
        err => {
          this.logError(err);
          setTimeout(() => {
            this.loading.dismiss();
          }, 0);
        },
        () => console.log('Projects request sent successfully')
      );
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

  showModal() {
    let modal = Modal.create(CreateProjectModal);
    this.navCtrl.present(modal);

    // Reload content if projects was added
    modal.onDismiss(data => {
      if(data == true) {
        this.loadProjects(this.tokenId.token);
      }
    });
  }

}
