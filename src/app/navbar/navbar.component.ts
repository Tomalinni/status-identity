import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {SidebarService} from '../services/side-bar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelfUserInfo} from '../models/self-user-info.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private self: SelfUserInfo;
  private getSelfError = false;

  private isAdmin = false;
  private isSuperAdmin = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private sidebarService: SidebarService,
              private modalService: NgbModal) {
  }

  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit() {
    this.userService.getSelfUserInfo()
      .subscribe((response) => {
        this.self = response.json();
        this.getSelfError = false;
      },
        (error) => {
          this.getSelfError = true;
        },
        () => {
          if (this.self.roles.find(role => role.role === 'SUPER_ADMIN')) {
            this.isSuperAdmin = true;
            this.isAdmin = true;
          } else if (this.self.roles.find(role => role.role === 'ADMIN')) {
            this.isSuperAdmin = false;
            this.isAdmin = true;
          } else {
            this.isSuperAdmin = false;
            this.isAdmin = false;
          }
        });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
