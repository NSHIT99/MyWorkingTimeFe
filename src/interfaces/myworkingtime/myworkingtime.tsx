import { IError } from "../auth/authType";

export interface ITasksProjects {
  projectTaskId: number;
  taskName: string;
}

export interface IProjectsInTasksReq {
  projectName: string;
  projectCode: number;
  listPM: string[];
  tasks: ITasksProjects[];
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
  error: string;
  result: string;
  success: boolean;
  targetUrl: string;
  unAuthRequest:boolean;
  __abp:boolean;
}

export interface IWorking {
  projectTaskId: number;
  note: string;
  workingTime: number;
  status: number;
  typeOfWork: number;
  createdAt?: string;
  dateAt: string;
  userId?: number;
  id?: number;
  updatedAt?: string;
}

export interface IWorkingtimeOfUser {
  working: IWorking[];
  taskName: string;
  projectCode: string;
  projectName: string;
  billable: boolean;
}

export interface IWorkingtimeOfUserRes {
  result: IWorkingtimeOfUser[];
}

export interface ICreateWorkingTimeRes {
  result: IWorking[];
}