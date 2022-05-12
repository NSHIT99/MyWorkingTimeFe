import { IError } from "../auth/authType";

export interface IWorkingtimeReq {
  branch: number;
  branchName: string;
  id: number;
  workingTime: number;
  status: number;
  typeOfWork: number;
  userId: number;
  isUserInProject: true;
  listPM: string[];
  mytimesheetNote: string;
  projectCode: string;
  project: number;
  projectName: string;
  taskId: number;
  task: string;
  type: string;
  avatarPath: string;
  user: string;
}

export interface IWorkingtimeRes {
  result: IWorkingtimeReq[];
}

export interface IGetDateWorkingtime {
  startDate?: string;
  endDate?: string;
  status?: number;
}

export interface IApproveWorkingtimesReq {
  idApprove: number[];
}

export interface IRejectWorkingtimesReq {
  idReject: number[];
}

export interface IResultApprove {
  success: string;
  successCount: number;
  failedCount: number;
  fail: string;
  lockDate:string;
}

export interface IResultApproveWorkingtimesRes {
  result: IResultApprove;
  targetUrl: string;
  success: boolean;
  error: string;
  unAuthRequest:boolean;
  __abp:boolean;
}

export interface IResultReject {
  fail: string;
  lockDate:string;
  success: string;
}

export interface IResultRejectWorkingtimesRes {
  result: IResultReject;
  targetUrl: string;
  success: boolean;
  error: string;
  unAuthRequest:boolean;
  __abp:boolean;
}