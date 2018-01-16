import {Role} from './role.model';

export class SelfUserInfo {
  public id: number;
  public email: string;
  public username: string;
  public first: string;
  public last: string;
  public roles: Role[];
  public enabled: boolean;
  public activated: boolean;
  public tokenFCM: string;
}
