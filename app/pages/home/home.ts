import {Component} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

// Services
import { ProjectsService } from '../../providers/projects-service/projects-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ProjectsService]
})
export class HomePage {

  private loading: any;

  constructor(private navCtrl: NavController, private projectsService: ProjectsService) {

    let tokenId = JSON.parse(window.sessionStorage.getItem('tokenid'));
    this.loadProjects(tokenId.token);

  }

  loadProjects(tokenid) {
    this.projectsService.loadProjects(tokenid)
      .subscribe(
        response  => {
          this.presentLoadingDefault();
          console.log(response);
        },
        err => {
          this.logError(err);
          this.loading.dismiss();
        },
        () => console.log('User Object sent successfully')
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
