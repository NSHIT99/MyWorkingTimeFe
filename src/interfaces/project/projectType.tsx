import { IError } from "../auth/authType";

export interface IProjectReq {
  name: string;
  fullName: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  id: number;
  timeStart: string;
  timeEnd: string;
}

export interface IProjectRes {
  result: IProjectReq[];
}

export interface IGroups {
  [key: string | number]: IProjectReq[];
}

export interface IProjectSearch {
  status?: number;
  search?: string;
}

export interface ICreateProject {
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: string;
  projectType: number;
  tasks: {
    taskId: number;
    billable?: boolean;
    id: number;
    confirm: boolean;
    timeStartTask: string;
    timeEndTask: string;
  }[];
  users: {
    userId: number;
    type?: number;
    id: number;
  }[];
  id?: number;
}

export interface ICreateProjectRes {
  result: ICreateProject;
}

export interface IActiveProjectReq {
  id: number;
}

export interface IDeleteProjectRes {
  success: boolean;
  error: IError;
}

export interface IEditProject {
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: string;
  projectType: number;
  tasks: {
    taskId: number;
    billable?: boolean;
    id: number;
    timeStartTask: string;
    confirm: boolean;
    timeEndTask: string;
  }[];
  users: {
    userId: number;
    type?: number;
    id: number;
  }[];
}

export interface IEditProjectRes {
  result: IEditProject;
}

export interface IGetProjectReq {
  input?: number;
}
