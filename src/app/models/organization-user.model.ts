import {Role} from './role.model';

export class OrganizationUser {
  public id: string;
  public email: string;
  public username: string;
  public first: string;
  public last: string;
  public enabled: boolean;
  public activated: boolean;
  public roles: Role[];
  public tokenFCM: string;
  constructor (id: string, email: string, username: string, first: string, last: string, enabled: boolean,
               activated: boolean, roles: Role[], tokenFCM: string) {
  this.id = id;
  this.email = email;
  this.username = username;
    this.first = first;
    this.last = last;
    this.enabled = enabled;
    this.activated = activated;
    this.roles = roles;
    this.tokenFCM = tokenFCM;
  }
}
