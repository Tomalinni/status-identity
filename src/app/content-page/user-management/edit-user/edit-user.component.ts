import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminModel } from '../../../models/admin.model';
import { AdminService, UserService, OrganizationService } from '../../../services/index';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  orgId: string = null;

  constructor(private adminService: AdminService,
    private userService: UserService, private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService, public router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(id => {
      this.orgId = id.orgId;
    });
  }

  editUser(form: NgForm) {
    const admin = {
      first: form.value.firstName,
      last: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      username: form.value.firstName + ' ' + form.value.lastName
    };
    this.userService.createUser(admin).subscribe(data => {
      this.userService.setUserRole(data.id, [2, 3]).subscribe(user => {
        const users = [user.id];
        this.organizationService.addUsers(this.orgId, users).subscribe(() => {
          this.router.navigate(['/dashboard/admin/organizations']); // при успешном добавлении админа
        });
      }, error => {
        console.log('Error in setRole method (createAdmin component): ', error);
      });
    }, error => {
      console.log('Error in createUser method (createAdmin component): ', error);
    });
  }

  // this.userService.getUsers().subscribe()
}

