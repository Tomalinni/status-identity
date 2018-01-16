import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http} from '@angular/http';
import {ApiConnectService} from './api-connect.service';

@Injectable()
export class TokenService {
  private authorization: string = 'Basic ' + btoa('zuul-service:zuul-service-secret');

  constructor(private router: Router,
              private http: Http,
              private apiURL: ApiConnectService) {
  }

  getAccessTokenString(): string {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken !== null) {
      return 'Bearer ' + sessionStorage.getItem('access_token');
    } else {
      const refreshToken = this.getRefreshTokenString();
      if (refreshToken !== null) {
        this.refreshAccessToken(refreshToken).subscribe((res) => {
          this.setAccessToken(res.json().access_token);
          return this.getAccessTokenString();
        },
          (error) => {
            this.router.navigate(['/signin']);
          });
      } else {
        this.router.navigate(['/signin']);
      }
    }
  }

  setAccessToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  getRefreshTokenString(): string {
    return sessionStorage.getItem('refresh_token');
  }

  getAccessToken() {
    const accessToken = sessionStorage.getItem('access_token');
    return accessToken;
  }

  getHeaders(): Headers {
    return new Headers({
      'Authorization': this.getAccessTokenString()
    });
  }

  refreshAccessToken(refreshToken: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.authorization
    });

    return this.http.post(this.apiURL.refreshToken + '&refresh_token=' + refreshToken,
      null,
      {headers: headers});
  }
}
