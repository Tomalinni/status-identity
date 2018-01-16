export class OrganizationModel {
  public name: string;
  public address: string;
  public admins: string;
  public organizations: string;
  public self: string;
  public users: string;

  constructor(name: string, address: string, admins: string, organizations: string, self: string, users: string) {
    this.name = name;
    this.address = address;
    this.admins = admins;
    this.organizations = organizations;
    this.self = self;
    this.users = users;
  }
}
