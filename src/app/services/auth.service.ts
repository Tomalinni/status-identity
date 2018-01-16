import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ApiConnectService} from './api-connect.service';
import {TokenService} from './token.service';
import {UserService} from './user.service';

@Injectable()
export class AuthService {

  constructor(private http: Http,
              private router: Router,
              private apiURL: ApiConnectService,
              private tokenService: TokenService) {
  }

  private authorization: string = 'Basic ' + btoa('zuul-service:zuul-service-secret');

  isAuthenticated(): boolean {
    return this.tokenService.getAccessTokenString() !== null;
  }


  signIn(login, password) {

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.authorization
    });

    return this.http.post(this.apiURL.logIn + '&password=' + password + '&username=' + login ,
      null,
      {headers: headers});
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }
}
