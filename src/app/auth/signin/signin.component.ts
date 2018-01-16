import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  private signinError = false;

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) {

  }

  onSignin(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;

    this.authService.signIn(login, password).subscribe(
      (response: Response) => {
        this.cookieService.deleteAll();
        if (response.status === 200) {
          sessionStorage.setItem('access_token', response.json().access_token);
          sessionStorage.setItem('refresh_token', response.json().refresh_token);
          this.router.navigate(['/dashboard/home']);
        }
      },
      (error) => {
        console.log(error);
        this.signinError = true;
      });
  }
}
