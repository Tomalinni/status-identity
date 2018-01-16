import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { ApiConnectService } from './api-connect.service';

import {OrganizationModel} from '../models/organization.model';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';
import { Response } from '@angular/http/src/static_response';
import {AdminModel} from "../models/admin.model";

@Injectable()
export class OrganizationService {

  private url = 'http://localhost:64269/api/users/';
  constructor(private http: Http,
              private apiURL: ApiConnectService,
              private tokenService: TokenService) { }

  getOrganizations(): Observable<OrganizationModel[]> {
    return this.http.get(this.apiURL.getAllOrganizations, {headers: this.tokenService.getHeaders()}).map((resp:Response) => {
      let data = resp.json();
      let respParse = data["_embedded"].organization;
      let organizations: OrganizationModel[] = [];
      for(let organization of respParse) {
        let links = organization._links;
        organizations.push({
          name: organization.name,
          address: organization.address,
          admins: links.admins.href,
          organizations: links.organization.href,
          self: links.self.href,
          users: links.users.href
        })
      };
      return organizations;
    })
  }

  createOrganization(organization: OrganizationModel) {
    let body = {
      name: organization.name,
      address: organization.address
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiURL.createCompany.concat('?access_token=', this.tokenService.getAccessToken()), JSON.stringify(body), { headers: headers });
  }

  addUsers(orgId: string, usersId: number[]):any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiURL.baseApiUrl.concat('/resource/org/', orgId, '/admins?access_token=', this.tokenService.getAccessToken()), JSON.stringify(usersId), { headers: headers }).map((resp: Response) => {
      let data = resp.json();
    },
    error => {
      console.log('Error in AddUser mehod (OrganizationService): ', error);
    });
  }

}
