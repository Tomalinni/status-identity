import {Injectable, OnInit} from '@angular/core';
import {Headers, Http, RequestOptions, RequestOptionsArgs, ResponseContentType, Response } from '@angular/http';
import {ApiConnectService} from './api-connect.service';
import * as moment from 'moment';
import {TokenService} from './token.service';
import {Principal} from '../models/principal.model';
import {Observable} from 'rxjs/Observable';
import {SelfUserInfo} from '../models/self-user-info.model';



@Injectable()
export class UserService implements OnInit {
  private timeUTC;

  constructor(private http: Http,
              private apiURL: ApiConnectService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }

  getPrincipal(): Observable<any> {
    console.log(this.tokenService.getHeaders());
    return this.http.get(this.apiURL.getSessionUser, {headers: this.tokenService.getHeaders()});
  }

  getTimezoneOffset() {
    if (moment().utcOffset() >= 0) {
      if (moment().utcOffset() / 60 < 10) {
        // return '+0' + moment().utcOffset() / 60 + ':00';
        this.timeUTC = '+0' + moment().utcOffset() / 60 + ':00';
        // console.log(this.timeUTC);
      } else {
        // return '+' + moment().utcOffset() / 60 + ':00';
        this.timeUTC = '+' + moment().utcOffset() / 60 + ':00';
        // console.log(this.timeUTC);
      }
    } else {
      if (moment().utcOffset() / 60 > -10) {
        // return '-0' + (moment().utcOffset() / 60).toString().split('-')[1] + ':00';
        this.timeUTC = '-0' + (moment().utcOffset() / 60).toString().split('-')[1] + ':00';
        // console.log(this.timeUTC);
      } else {
        // return moment().utcOffset() / 60 + ':00';
        this.timeUTC = moment().utcOffset() / 60 + ':00';
        // console.log(this.timeUTC);
      }
    }
    // return this.timeUTC;
  }

  public getSelfUserInfo(): any {
    return this.http.get(this.apiURL.getSelfInfo, {headers: this.tokenService.getHeaders()});
  }

  public createUser(user):Observable<SelfUserInfo> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiURL.user.concat('?access_token=', this.tokenService.getAccessToken()), JSON.stringify(user), { headers: headers }).map((resp: Response) => {
      let data = resp.json();
      let user: SelfUserInfo = {
        activated: data.activated,
        email: data.email,
        first: data.first,
        id: data.id,
        last: data.last,
        roles: data.roles,
        enabled: data.enabled,
        username: data.username,
        tokenFCM: data.tokenFCM
      }
      return user;
    });
  }

  setUserRole(userId: number, roleId: number[]): Observable<SelfUserInfo> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiURL.baseApiUrl.concat('/resource/user/', userId.toString(), '/roles?access_token=', this.tokenService.getAccessToken()), JSON.stringify(roleId), { headers: headers }).map((resp: Response) => {
      let data = resp.json();
      let user: SelfUserInfo = {
        activated: data.activated,
        email: data.email,
        first: data.first,
        id: data.id,
        last: data.last,
        roles: data.roles,
        enabled: data.enabled,
        username: data.username,
        tokenFCM: data.tokenFCM
      }
      return user;
    })
  }

  sendCsvFile(id: string, formData: FormData) {
    return this.http.post(this.apiURL.getCreateCompanyUsers(id), formData, {headers: this.tokenService.getHeaders()});
  }

  refreshUserCode(id: string) {
    return this.http.get(this.apiURL.getRefreshUserCodeUrl(id), {headers: this.tokenService.getHeaders()});
  }

  usersForOrganization(id: string) {
    return this.http.get(this.apiURL.getUsersForOrganizationUrl(id), {headers: this.tokenService.getHeaders()});
  }

}
