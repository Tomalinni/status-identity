import {Injectable} from '@angular/core';

@Injectable()
export class ApiConnectService {

  // backend server URL:
  // public baseApiUrl = 'http://localhost/backend';

  // backend server URL:
  public baseApiUrl = 'http://54.156.210.64/api';
  public resourceUrl = this.baseApiUrl + '/resource';

  // routes:
  public logIn = this.baseApiUrl + '/auth/oauth/token?grant_type=password';
  public refreshToken = this.baseApiUrl + '/auth/oauth/token?grant_type=refresh_token';

  public getSelfInfo = this.resourceUrl + '/user/self';


//   там один на access и один на рефреш
//   access юзаешь в запросах
//   refresh для обновления access'a когда он заэкспайрится
//   значит по роутам
//   для вэба все будут с префиксом /resource/

//   чтобы получить батч юзеров , будeт hateoas
//   пример "/userREST?size=5&page=1" - GET
//   в респонсе там будет приходить доп инфа по кол-ву страниц , ссылка на след страницу и т.д.
//   для организаций тож самое все вместо user - org
//   и вместо roles у org в роуте может быть users или admins (/org/{orgId}/admins - GET,POST,DELETE)
// чтобы добавить юзера в организацию "/org/{orgId}/register" и файл прикрепляешь



  // - DELETE  удаление пользователя (пока не дергай:D)
  public deleteUser = this.baseApiUrl + '/resource/user/{userId}';

  // - PATCH; json апдейт (пример jsona: '{'id':'1','username':'username1','email':'email1;@gmail.com'}';)
  // (если; не; выставишь; id , то; создастся; новый;)
  public user = this.baseApiUrl + '/resource/user';

  //  - GET; все; роли;
  public getAllRoles = this.baseApiUrl + '/resource/role'; // getAllRoles, getAllGroups, getAllUsers

  // - - GET; роли; юзера; с; userId;
  public getRoleUser = this.baseApiUrl + '/resource/user/{userId}/roles';

  // - POST; json;  добавить; роли; юзеру (пример jsona: '[1,2]';)
  public postRoleUser = this.baseApiUrl + '/resource/user/{userId}/roles';

  // - DELETE;  json;  удалить; роли; юзеру (пример jsona: '[1,2]';)
  public deleteRoleUser = this.baseApiUrl + '/resource/user/{userId}/roles';

  // - GET; получить; инфу; по; текущей; сессии; юзера;
  public getSessionUser = this.baseApiUrl + '/resource/user/principal';

  //  - GET; выслать; повторно; код; на; почту;
  public getCodeUser = this.baseApiUrl + '/resource/user/{userId}/code';

  // - GET сгенерить и выслать новый код на почту
  public refreshCode = this.baseApiUrl + '/user/{userId}/refresh_code';

  // - чтобы получить батч юзеров , будeт hateoas
  // пример
  public getBatchUsers = this.baseApiUrl + '/resource/userREST?size=5&page=1';


  // - DELETE  удаление company (пока не дергай:D)
  public deleteCompany = this.baseApiUrl + '/resource/org/{orgId}';

  // create user org + file assets/test
  public createUser = this.baseApiUrl + '/resource/user/{userId}/register';

  public createCompanyUsers = this.baseApiUrl + '/resource/org/';

  public createCompany = this.baseApiUrl + '/resource/org';

  public getAllOrganizations = this.resourceUrl + '/api/orgREST';

  public getOrganization = this.resourceUrl + '/api/orgREST/'; //+ Id

  public getCreateCompanyUsers(id: string) {
    return this.baseApiUrl + '/resource/org/' + id + '/register';
  }

  public getRefreshUserCodeUrl(id: string) {
    return this.resourceUrl + '/user/' + id + '/refresh_code';
  }

  public getUsersForOrganizationUrl(id: string) {
    return this.resourceUrl + '/org/' + id + '/users';
  }

  constructor() {
  }
}
