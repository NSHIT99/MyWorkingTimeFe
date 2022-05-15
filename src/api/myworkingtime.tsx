import {
  ICreateWorkingTimeRes,
  IProjectsInTasksRes,
  ISubmitToPendingReq,
  IResultRes,
  IWorking,
  IWorkingtimeOfUserRes,
} from "../interfaces/myworkingtime/myworkingtime";
import { IDeleteRes } from "../interfaces/type";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getProjectsInTasksApi = async () => {
  const res = await getApi<IProjectsInTasksRes>(
    `/Myworkingtime/GetProjectsIncludingTasks`
  );
  return res;
};

export const submitToPendingApi = async ({
  startDate,
  endDate,
}: ISubmitToPendingReq) => {
  const res = await postApi<ISubmitToPendingReq, IResultRes>(
    `/Myworkingtime/SubmitToPending`,
    {
      startDate,
      endDate,
    }
  );
  return res;
};

export const getWorkingtimeOfUserApi = async ({
  startDate,
  endDate,
}: ISubmitToPendingReq) => {
  const res = await getApi<IWorkingtimeOfUserRes>(
    `/Myworkingtime/GetWorkingtimeOfUser?startDate=${startDate}&endDate=${endDate}`
  );
  return res;
};

export const createMyworkingTimeApi = async ({
  projectTaskId,
  note,
  workingTime,
  status,
  typeOfWork,
  createdAt,
  userId,
  id,
  updatedAt,
  dateAt,
}: IWorking) => {
  const create = await postApi<IWorking, ICreateWorkingTimeRes | IDataError>(
    `/Myworkingtime/Create`,
    {
      projectTaskId,
      note,
      workingTime,
      status,
      typeOfWork,
      createdAt,
      userId,
      id,
      updatedAt,
      dateAt,
    }
  );
  return create;
};

export const deleteMyWorkingTimeApi = async (id: number) => {
  const data = await deleteApi<IDeleteRes>(`/Myworkingtime/Delete?id=${id}`);
  return data;
};

export const updateMyWorkingtimeApi = async ({
  projectTaskId,
  note,
  workingTime,
  status,
  typeOfWork,
  createdAt,
  dateAt,
  userId,
  id,
  updatedAt,
}: IWorking) => {
  const update = await postApi<IWorking, ICreateWorkingTimeRes | IDataError>(
    `/Myworkingtime/Update`,
    {
      projectTaskId,
      note,
      workingTime,
      status,
      typeOfWork,
      createdAt,
      dateAt,
      userId,
      id,
      updatedAt,
    }
  );
  return update;
};
