import {Component} from '@angular/core';
import {NavController, Loading, MenuController} from 'ionic-angular';

// Page
import { ProjectDetailPage } from '../project-detail/project-detail';

// Services
import { ProjectsService } from '../../providers/projects-service/projects-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ProjectsService]
})
export class HomePage {

  private loading: any;
  private projectsArr: any;
  private projectDetailPage: any;

  constructor(private navCtrl: NavController, private projectsService: ProjectsService, private menu: MenuController) {

    // let tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));
    // this.loadProjects(tokenId.token);

    this.menu.swipeEnable(false);
    this.projectDetailPage = ProjectDetailPage;

    let tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));
    this.loadProjects('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');

  }

  loadProjects(tokenid) {
    this.projectsService.loadProjects(tokenid)
      .subscribe(
        response  => {
          this.presentLoadingDefault();
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

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

}
