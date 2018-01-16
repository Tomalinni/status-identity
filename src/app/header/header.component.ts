import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {SidebarService} from '../services/side-bar.service';
import {SelfUserInfo} from '../models/self-user-info.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private self: SelfUserInfo;
  private getSelfError = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sidebarService: SidebarService
  ) {
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
        () => {});
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  signOut() {
    this.authService.signOut();
  }

  onSidebar() {
    this.sidebarService.openSideBar();
  }
}
