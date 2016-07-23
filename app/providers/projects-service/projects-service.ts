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

    console.log(tokenid);

    // let body = JSON.stringify({ name });
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Token '+tokenid
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlPrefix+'api/v1/projects/', options)
                    .map(this.extractData);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  
}

