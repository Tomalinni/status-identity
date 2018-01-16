import {Component, Injectable, OnInit, Compiler} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {TaskDescService} from './services/task-desc.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

  modalTaskInfo;

  constructor(private autnService: AuthService,
              private router: Router,
              private taskDescService: TaskDescService,
              private _compiler: Compiler) {
    this._compiler.clearCache();
  }

  ngOnInit() {
    this.modalTaskInfo = this.taskDescService.getModalTaskInfo();
  }


}

