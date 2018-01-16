import {Injectable} from '@angular/core';

@Injectable()
export class TaskDescService {

  private modalTaskInfo = {

  };

  constructor() {
  }

  getModalTaskInfo() {
    return this.modalTaskInfo;
  }

}
