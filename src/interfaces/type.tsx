import { IError } from "./auth/authType";

export interface IDeleteRes {
    success: boolean;
    error: IError;
  }