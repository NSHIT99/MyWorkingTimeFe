import { createAsyncThunk } from "@reduxjs/toolkit";
import getTaskApi, {
  archiveTaskApi,
  createTaskApi,
  deArchiveTaskApi,
  deleteTaskApi,
} from "../../api/task";
import {
  ICreateTaskReq,
  IDeArchiveTaskReq,
  ITaskReq,
} from "../../interfaces/task/taskType";

export const getTask = createAsyncThunk("/Task/GetAll", async () => {
  const response = await getTaskApi();
  return response;
});

export const createTask = createAsyncThunk(
  "/Task/Save",
  async ({ id, name, type }: ICreateTaskReq) => {
    const create = await createTaskApi({
      id,
      name,
      type,
    });
    return create as { result: ITaskReq };
  }
);

export const deleteTask = createAsyncThunk(
  "/Task/Delete",
  async (id: number) => {
    const response = { ...(await deleteTaskApi(id)), id };
    return response;
  }
);

export const archiveTask = createAsyncThunk(
  "/Task/Archive",
  async (id: number) => {
    const response = { ...(await archiveTaskApi(id)), id };
    return response;
  }
);

export const deArchiveTask = createAsyncThunk(
  "/Task/DeArchive",
  async ({ id }: IDeArchiveTaskReq) => {
    const response = { ...(await deArchiveTaskApi({ id })), id };
    return response;
  }
);
