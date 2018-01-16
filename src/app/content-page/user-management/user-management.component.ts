import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileUtil } from './file.util';
import { Constants } from './test.constants';
import {forEach} from '@angular/router/src/utils/collection';
import {UserService} from '../../services/user.service';
import {noUndefined} from '@angular/compiler/src/util';
import {OrganizationUser} from '../../models/organization-user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {

  @ViewChild('fileImportInput')
  fileImportInput: any;
  csvRecords = [];
  csvChecked = [];
  csvRecordsTemp = [];

  orgUsers: OrganizationUser[];
  formData: FormData = new FormData();

  constructor(private _router: Router,
              private _fileUtil: FileUtil,
              private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.usersForOrganization('1').subscribe((response) => {
      if (response.status === 200) {
        this.orgUsers = response.json();
      }
    });
  }

  delItem(): void {
    console.log('in method');
    for (const n of this.csvChecked) {
      console.log('in for');
      if (this.orgUsers.includes(n))
        console.log('in if');
        const ind: number = this.orgUsers.indexOf(n);
        if (ind !== -1) {
          this.orgUsers.splice(ind, 1);
        }
      }
    this.csvChecked = [];
  }

  fieldsChangePos(values: any, csvRec) {
    if (values.currentTarget.checked) {
      if (!this.csvChecked.includes(csvRec)) {
        this.csvChecked.push(csvRec);
      }
    } else {
      if (this.csvChecked.includes(csvRec)) {
        const ind: number = this.csvChecked.indexOf(csvRec);
        if (ind !== -1) {
          this.csvChecked.splice(ind, 1);
        }
      }
    }
    console.log(this.csvChecked);
  }

  fileChangeListener($event): void {
    const text = [];
    const target = $event.target || $event.srcElement;
    const files = target.files;
    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this._fileUtil.isCSVFile(files[0])) {
        alert('Please import valid .csv file.');
        this.fileReset();
      }
    }

    const input = $event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      const csvData = reader.result;
      const csvRecordsArray = csvData.split(/\r\n|\n/);

      let headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        const headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecordsTemp = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      console.log(this.csvRecords);

      for (let i = 0; i < this.csvRecordsTemp.length; i++) {
        this.csvRecords.push(this.csvRecordsTemp[i]);
      }

      this.csvRecordsTemp = [];

      if (this.csvRecords == null) {  // If control reached here it means csv file contains error, reset file.
        // this.fileReset();
      }
    };

    const file: File = files[0];
    this.formData.set('file', file, file.name);

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  }

  uploadFile() {
    if (this.formData.get('file') !== null) {
      this._userService.sendCsvFile('1', this.formData).subscribe((response) => {
        console.log(response);
        console.log(response.status);
        alert('file uploaded successfully!');
      },
        (error) => {
          console.log('Error upload ', error);
      });
    }
  }

  resendCode(id: string) {
    this._userService.refreshUserCode(id).subscribe((response) => {
      if (response.status === 200) {
        alert('code was refreshed successfully!');
      }
    });
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }
}
