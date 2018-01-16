import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../services/side-bar.service';
import {TaskBarService} from '../services/task-bar.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {

  loadedFeature = 'home-task';

  constructor(private sidebarService: SidebarService, private taskbarService: TaskBarService) {
  }

  ngOnInit() {
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
