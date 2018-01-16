import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ApiConnectService} from './api-connect.service';

import {HttpClient, HttpParams} from '@angular/common/http';
import {AdminModel} from '../models/admin.model';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class AdminService {

  constructor(private http: Http,
              private apiURL: ApiConnectService,
              private tokenService: TokenService) {}

  getOrganizationAdmins(url): Observable<AdminModel[]> {
    return this.http.get(url, {headers: this.tokenService.getHeaders()}).map((resp: Response) => {
      const data = resp.json();
      const respParse = data['_embedded'].user;
      const admins: AdminModel[] = [];
      for (const admin of respParse) {
      admins.push({
          first: admin.name,
          last: admin.last,
          username: admin.username,
          email: admin.email
        });
      }
      return admins;
    });
  }
  

}
