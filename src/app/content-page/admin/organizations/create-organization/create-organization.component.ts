import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';

import {TemplateRef, ViewChild} from '@angular/core';
import {OrganizationModel} from '../../../../models/organization.model';
import { OrganizationService } from '../../../../services/index';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css'] // providers: [AdminService]
})
export class CreateOrganizationComponent implements OnInit {

  editedOrganization: OrganizationModel;
  isNewRecord: boolean;
  statusMessage: string;
  organizations: Array<OrganizationModel>;

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
  }

  createCompany(form: NgForm) {
    let organization: OrganizationModel = {
      address: form.value.companyAddress,
      admins: '',
      name: form.value.companyName,
      organizations: '',
      self: '',
      users: ''
    }
    this.organizationService.createOrganization(organization).subscribe(data => console.log(data), error => console.log('Error!: ', error));
  }
  //

  // // загружаем один из двух шаблонов
  // loadTemplate(organizations: OrganizationModel) {
  //   if (this.editedOrganization && this.editedOrganization.organizationId === organizations.organizationId) {
  //     return this.editTemplate;
  //   } else {
  //     return this.readOnlyTemplate;
  //   }
  // }
  //
  // saveOrganization() {
  //   if (this.isNewRecord) {
  //     // добавляем пользователя
  //     this.serv.createOrganization(this.editedOrganization).subscribe(data => {
  //       this.statusMessage = 'Данные успешно добавлены',
  //         this.loadOrganizations();
  //     });
  //     this.isNewRecord = false;
  //     this.editedOrganization = null;
  //   } else {
  //     // изменяем
  //     this.serv.updateOrganization(this.editedOrganization.organizationId, this.editedOrganization).subscribe(data => {
  //       this.statusMessage = 'Данные успешно обновлены',
  //         this.loadOrganizations();
  //     });
  //     this.editedOrganization = null;
  //   }
  // }

  //
  //
  // }
}

