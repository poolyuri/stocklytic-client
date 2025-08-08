export interface IUser {
  idCompany: number;
  idUser: number;
}

export class User {
  constructor(
    public idCompany: number,
    public idUser: number,
    public guidUser: string,
    public nameUser: string,
    public lastName: string,
    public fullName: string,
    public dateBrith: string,
    public i016Gender: number,
    public i001DocumentType: number,
    public numberDocument: string,
    public direction: string,
    public phone: string,
    public email: string,
    public password: string = '',
    public nameImage: string,
    public idState: number,
    public changePassword?: boolean,
  ) { }
}
