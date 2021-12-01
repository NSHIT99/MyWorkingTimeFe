import { IError } from "../auth/authType";

export interface IRoleReq {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

export interface IRoleRes {
  result:IRoleReq[];
}

export interface ICreateRoleReq {
  id?: number;
  name: string;
  displayName: string;
  description: string;
}

export interface ICreateRoleRes {
  result: ICreateRoleReq[];
}

