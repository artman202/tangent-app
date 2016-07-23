import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ProjectDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/project-detail/project-detail.html',
})
export class ProjectDetailPage {

  private project: any;
  private projectTaskSet: any;
  private endDate: boolean;

  constructor(private nav: NavController, public navParams: NavParams) {

    let project = JSON.parse('{"pk":3,"title":"Stark Industries CRM","description":"Helping iron man keep track of his customers","start_date":"2015-02-18","end_date":null,"is_billable":true,"is_active":true,"task_set":[{"id":4,"title":"Meetings","due_date":null,"estimated_hours":"45.00","project":3,"project_data":{"pk":3,"title":"Stark Industries CRM","description":"Helping iron man keep track of his customers","start_date":"2015-02-18","end_date":null,"is_billable":true,"is_active":true}},{"id":2,"title":"Project Management","due_date":"2015-04-01","estimated_hours":"150.00","project":3,"project_data":{"pk":3,"title":"Stark Industries CRM","description":"Helping iron man keep track of his customers","start_date":"2015-02-18","end_date":null,"is_billable":true,"is_active":true}},{"id":1,"title":"Development","due_date":"2015-04-01","estimated_hours":"300.00","project":3,"project_data":{"pk":3,"title":"Stark Industries CRM","description":"Helping iron man keep track of his customers","start_date":"2015-02-18","end_date":null,"is_billable":true,"is_active":true}}],"resource_set":[]}');

    console.log(project);

    navParams.data = project;

    if(navParams.data.end_date == null || navParams.data.end_date == undefined || navParams.data.end_date == '') {
      this.endDate = false;
    } else {
      this.endDate = true;
    }

    // if(navParams.data.end_date == null || navParams.data.end_date == undefined || navParams.data.end_date == '') {
    //   this.endDate = false;
    // } else {
    //   this.endDate = true;
    // }

    // console.log(JSON.parse(navParams.data));

    // this.project = navParams.data;
    // this.projectTaskSet = this.project.task_set;

    this.project = project;

  }

}
