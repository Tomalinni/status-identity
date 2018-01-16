import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import {AdminService} from '../../../services/admin.service';
import {CompanyModel} from '../../../models/company.model';
import {Router} from '@angular/router';
import {OrganizationModel} from '../../../models/organization.model';
import {OrganizationService} from '../../../services/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})

export class OrganizationsComponent implements OnInit {
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  private organizationsLoadedError = false;
  private emptyOrganizationsList = true;
  organizations: Array<OrganizationModel>;

  constructor (private router: Router,
               private serv: OrganizationService) {
  }

  ngOnInit(): void {
    this.organizations = [];
    this.loadOrganizations();
  }

  private loadOrganizations() {
    this.serv.getOrganizations().subscribe(data => {
      this.organizations = data;
    },
    error => {
      console.log('Error in organizationService: ', error);
    }
  );
  }

  loadTemplate(organizations: OrganizationModel) {
    // if (this.editedOrganization && this.editedOrganization.organizationId === organizations.organizationId) {
    //   return this.editTemplate;
    // } else {
      return this.readOnlyTemplate;
    // }
  }

  viewOrganization(organization: OrganizationModel) {
    this.router.navigate(['/dashboard/admin/all-organization-admin', {admins: organization.admins}]);
  }

  // goToAdd() {
  //   this.router.navigate(['/dashboard/admin/organizations/create-organization']);
  // }
}

