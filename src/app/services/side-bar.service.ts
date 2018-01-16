import {Injectable} from '@angular/core';

@Injectable()
export class SidebarService {

  isOpen = true;

  openSideBar() {
    this.isOpen = !this.isOpen;
  }

}
