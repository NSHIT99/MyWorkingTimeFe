export interface ITaskReq {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
}

export interface ITaskRes {
  result: ITaskReq[];
}

export interface ICreateTaskReq {
  id?: number;
  name: string;
  type: number;
}

export interface ICreateTaskRes {
  result: ICreateTaskReq[];
}

export interface IDeArchiveTaskReq {
  id: number;
}

export interface ISearchBar {
  setSearchKey: (e: string) => void;
}
