import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiConnectService} from './api-connect.service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private router: Router,
              private userService: UserService,
              private apiURL: ApiConnectService) {
  }

}


