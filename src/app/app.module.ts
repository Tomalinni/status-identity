import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {RouterModule, Routes} from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DatePickerModule} from 'angular-io-datepicker';
import {OverlayModule} from 'angular-io-overlay/src/overlay';
import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SigninComponent} from './auth/signin/signin.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContentPageComponent} from './content-page/content-page.component';
import {UserManagementComponent} from './content-page/user-management/user-management.component';
import {HomeComponent} from './content-page/home/home.component';
import {MyProfileComponent} from './content-page/my-profile/my-profile.component';
import {DropdownDirective} from './header/dropdown.directive';
import {OrganizationsComponent} from './content-page/admin/organizations/organizations.component';
import {AllOrganizationAdminComponent} from './content-page/admin/organizations/all-organization-admin/all-organization-admin.component';
import {CreateOrganizationComponent} from './content-page/admin/organizations/create-organization/create-organization.component';
import {CreateOrganizationAdminComponent} from './content-page/admin/organizations/create-organization-admin/create-organization-admin.component';
import {ViewUserProfileComponent} from './content-page/views/view-user-profile/view-user-profile.component';
import {EditUserProfileComponent} from './content-page/views/edit-user-profile/edit-user-profile.component';
import {TaskPipePipe} from './tasks-panel/task-pipe.pipe';
import {EditUserComponent} from './content-page/user-management/edit-user/edit-user.component';

import {SidebarService} from './services/side-bar.service';
import {ApiService} from './services/api.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {ApiConnectService} from './services/api-connect.service';
import {AdminService} from './services/admin.service';
import {TaskDescService} from './services/task-desc.service';
import {TaskBarService} from './services/task-bar.service';
import {ErrorInterceptor} from './services/error-interceptor.service';
import {TokenService} from './services/token.service';

import { Constants} from './content-page/user-management/test.constants';
import { FileUtil} from './content-page/user-management/file.util';
import {OrganizationService} from './services/organization.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, children: [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
    {path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
    {path: 'user-management/edit-user', component: EditUserComponent, canActivate: [AuthGuard]},
    {path: 'admin/organizations', component: OrganizationsComponent},
    {path: 'admin/create-organization', component: CreateOrganizationComponent},
    {path: 'admin/all-organization-admin', component: AllOrganizationAdminComponent},
    {path: 'admin/create-organization-admin', component: CreateOrganizationAdminComponent}
  ]
  },
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    NavbarComponent,
    DashboardComponent,
    ContentPageComponent,
    UserManagementComponent,
    HomeComponent,
    MyProfileComponent,
    DropdownDirective,
    OrganizationsComponent,
    AllOrganizationAdminComponent,
    CreateOrganizationComponent,
    CreateOrganizationAdminComponent,
    ViewUserProfileComponent,
    EditUserProfileComponent,
    EditUserComponent,
    TaskPipePipe
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    OverlayModule,
    DatePickerModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    { provide: Http, useClass: ErrorInterceptor },
    CookieService,
    AuthService,
    AuthGuard,
    UserService,
    SidebarService,
    TaskBarService,
    AdminService,
    ApiConnectService,
    ApiService,
    TaskDescService,
    TokenService,
    Constants,
    FileUtil,
    OrganizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
