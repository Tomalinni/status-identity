import {Injectable, OnInit} from '@angular/core';
import {Headers, Http, RequestOptions, RequestOptionsArgs, ResponseContentType} from '@angular/http';
import {ApiConnectService} from './api-connect.service';
import * as moment from 'moment';
import {TokenService} from './token.service';
import {CompanyModel} from '../models/company.model';
import {Observable} from 'rxjs/Observable';
import {SelfUserInfo} from '../models/self-user-info.model';


@Injectable()
export class UserService implements OnInit {

  private timeUTC;
  private selfUserInfo: SelfUserInfo;

  constructor(private http: Http, private apiURL: ApiConnectService, private tokenService: TokenService) {
  }

  ngOnInit(): void {

  }

  getSelf(): any {
    return this.http.get(this.apiURL.getSelfInfo, {headers: this.tokenService.getHeaders()});
  }

  createCompany(): Observable<any> {
    console.log(this.tokenService.getHeaders());
    return this.http.get(this.apiURL.createCompany, {headers: this.tokenService.getHeaders()});
  }
}
