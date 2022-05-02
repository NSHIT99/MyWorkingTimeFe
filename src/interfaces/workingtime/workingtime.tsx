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
