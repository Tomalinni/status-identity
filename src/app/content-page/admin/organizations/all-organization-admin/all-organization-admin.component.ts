import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import {TemplateRef, ViewChild} from '@angular/core';
import {AdminModel} from '../../../../models/admin.model';
import { AdminService, OrganizationService } from '../../../../services/index';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-all-organization-admin',
  templateUrl: './all-organization-admin.component.html',
  styleUrls: ['./all-organization-admin.component.css']
})
export class AllOrganizationAdminComponent implements OnInit {

// // типы шаблонов
//   @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
//   @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
//
//   editedAdmin: AdminModel;
  admins: AdminModel[] = [];
  isNewRecord: boolean;
  statusMessage: string;
  orgId: string = null;

  constructor(public activatedRoute: ActivatedRoute, private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      let splitUrl = data.admins.split('/');
      this.orgId = splitUrl[splitUrl.length - 2];
      this.adminService.getOrganizationAdmins(data.admins).subscribe(admins => {
        this.admins = admins;
      });
    });
  }

  createAdminPage() {
    this.router.navigate(['/dashboard/admin/create-organization-admin', { orgId: this.orgId }]);
  }

  // private loadAdmins() {
  //   this.serv.getOrganizationAdmins(this.admins).subscribe(data => {
  //       this.admins = data;
  //     },
  //     error => {
  //       console.log('Error in organizationService: ', error);
  //     }
  //   );
  // }

  // // // загрузка
  // private loadAdmins() {
  //   this.serv.getAdmins().subscribe((data: AdminModel[]) => {
  //     this.admins = data;
  //   });
  // }
  // // // добавление
  // addAdmin() {
  //   this.editedAdmin = new AdminModel('', '', '', '');
  //   this.admins.push(this.editedAdmin);
  //   this.isNewRecord = true;
  // }
  // //
  // // редактирование
  // editAdmin(admin: AdminModel) {
  //   this.editedAdmin = new AdminModel(admin.Id, admin.Name, admin.Age);
  // }
  // // // загружаем один из двух шаблонов
  // // loadTemplate(admin: AdminModel) {
  // //   if (this.editedAdmin && this.editedAdmin.Id === admin.Id) {
  // //     return this.editTemplate;
  // //   } else {
  // //     return this.readOnlyTemplate;
  // //   }
  // // }
  // // // сохраняем
  // // saveAdmin() {
  // //   if (this.isNewRecord) {
  // //     // добавляем пользователя
  // //     this.serv.createAdmin(this.editedAdmin).subscribe(data => {
  // //       this.statusMessage = 'Данные успешно добавлены',
  // //         this.loadAdmins();
  // //     });
  // //     this.isNewRecord = false;
  // //     this.editedAdmin = null;
  // //   } else {
  // //     // изменяем
  // //     this.serv.updateAdmin(this.editedAdmin.Id, this.editedAdmin).subscribe(data => {
  // //       this.statusMessage = 'Данные успешно обновлены',
  // //         this.loadAdmins();
  // //     });
  // //     this.editedAdmin = null;
  // //   }
  // // }
  // // // отмена редактирования
  // // cancel() {
  // //   // если отмена при добавлении, удаляем последнюю запись
  // //   if (this.isNewRecord) {
  // //     this.admins.pop();
  // //     this.isNewRecord = false;
  // //   }
  // //   this.editedAdmin = null;
  // // }
  // // // удаление
  // // deleteAdmin(admin: AdminModel) {
  // //   this.serv.deleteAdmin(admin.Id).subscribe(data => {
  // //     this.statusMessage = 'Данные успешно удалены',
  // //       this.loadAdmins();
  // //   });
  // // }
}

