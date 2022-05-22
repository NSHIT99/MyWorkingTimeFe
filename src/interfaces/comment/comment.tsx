export interface ICommentReq {
  title: string;
  idWorkingtime: number;
  userId: number;
  username?: string;
  id: number;
}

export interface ICommentRes {
  result: ICommentReq[];
}

export interface ICreateCommentReq {
  id?: number;
  title: string;
  idWorkingtime?: number;
  userId?: number;
}

export interface ICreateCommentRes {
  result: ICreateCommentReq[];
}
