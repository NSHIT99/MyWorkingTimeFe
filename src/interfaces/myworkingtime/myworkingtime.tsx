import { IError } from "../auth/authType";

export interface IProjectsInTasksReq {
  projectName: string;
  projectCode: number;
  listPM: string[]
  tasks: string[]
}

export interface IProjectsInTasksRes {
  result: IProjectsInTasksReq[];
}

export interface ISubmitToPendingReq {
  startDate?: string;
  endDate?: string;
  userId?: number;
}

export interface ISubmitToPendingRes {
  result: string;
}