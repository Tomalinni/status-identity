import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }
}
