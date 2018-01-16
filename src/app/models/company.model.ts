export class CompanyModel {
  public companyName: string;
  public companyId: string;
  public companyAddress: string;

  constructor (companyName: string, companyId: string, companyAddress: string ) {
    this.companyName = companyName;
    this.companyId = companyId;
    this.companyAddress = companyAddress;
  }
}
