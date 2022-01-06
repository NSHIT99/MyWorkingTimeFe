export interface IGetAllReq {
  id: number;
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  roleNames: string;
  avatarPath: string;
  type: number;
  branch: number;
  sex: number;
}

export interface IGetAllRes {
  result: IGetAllReq[];
}

export interface ICreateUserReq {
  id?: number;
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  roleNames: string;
  avatarPath: string;
  type: number;
  branch: number;
  sex: number;
}

export interface ICreateUserRes {
  result: ICreateUserReq[];
}

export interface IUserReq {
  id: number;
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  roleNames: string;
  avatarPath: string;
  type: number;
  branch: number;
  sex: number;
}

export interface IUserRes {
  result: IUserReq[];
}

export interface IUserNotPagging {
  id: number;
  fullName: string;
  type: number;
  avatarPath: string;
  branch: number;
  projectType?: number;
}

export interface IUserNotPaggingRes {
  result: IUserNotPagging[];
}

export interface IResetPassword {
  userId: number;
  adminPassword: string;
  newPassword: string;
}

export interface IResetPasswordRes {
  result: IResetPassword[];
}
