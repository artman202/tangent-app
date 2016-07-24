import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjectsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectsService {

  data: any;
  private urlPrefix = 'http://projectservice.staging.tangentmicroservices.com/';

  constructor(private http: Http) {
    this.data = null;
  }

  loadProjects(tokenid: string) {

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Token '+tokenid
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlPrefix+'api/v1/projects/', options)
                    .map(this.extractData);

  }

  createProject(projectObj: Object, tokenid: string) {

    let body = JSON.stringify(projectObj);

    console.log(body);

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Token '+tokenid
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlPrefix+'api/v1/projects/', body, options)
                    .map(this.extractData);

  }

  updateProject(projectObj: any, tokenid: string) {

    let body = JSON.stringify(projectObj);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Token '+tokenid
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(this.urlPrefix+'api/v1/projects/'+projectObj.pk+'/', body, options)
                    .map(this.extractData);

  }

  deleteProject(projectId: string, tokenid: string) {

    console.log(projectId);

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Token '+tokenid
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.urlPrefix+'api/v1/projects/'+projectId+'/', options)
                    .map(this.extractData);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  
}

