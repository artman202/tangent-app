import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  public urlPrefix = 'http://userservice.staging.tangentmicroservices.com/';

  constructor(private http: Http) {
  }

  loginUser(userObj: Object) {

    return this.http.post(this.urlPrefix+'api-token-auth/', userObj)
                    .map(this.extractData);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}

