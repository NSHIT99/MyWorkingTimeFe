import {
  ICreateTaskReq,
  IDeArchiveTaskReq,
  ITaskRes,
} from "../interfaces/task/taskType";
import { IDeleteRes } from "../interfaces/type";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

const getTaskApi = async () => {
  const res = await getApi<ITaskRes>(`/Task/GetAll`);
  return res;
};

export const createTaskApi = async ({ id, name, type }: ICreateTaskReq) => {
  const create = await postApi<ICreateTaskReq, ITaskRes | IDataError>(
    `/Task/Save`,
    {
      id,
      name,
      type,
    }
  );
  return create;
};

export const deleteTaskApi = async (id: number) => {
  const data = await deleteApi<IDeleteRes>(`/Task/Delete?id=${id}`);
  return data;
};

export const archiveTaskApi = async (id: number) => {
  const data = await deleteApi<IDeleteRes>(`/Task/Archive?id=${id}`);
  return data;
};

export const deArchiveTaskApi = async ({ id }: IDeArchiveTaskReq) => {
  const data = await postApi<IDeArchiveTaskReq, IDeleteRes>(
    `/Task/DeArchive?id=${id}`,
    {
      id,
    }
  );
  return data;
};

export default getTaskApi;
