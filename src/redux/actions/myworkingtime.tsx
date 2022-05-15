import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMyworkingTimeApi,
  deleteMyWorkingTimeApi,
  getProjectsInTasksApi,
  getWorkingtimeOfUserApi,
  submitToPendingApi,
  updateMyWorkingtimeApi,
} from "../../api/myworkingtime";
import {
  ISubmitToPendingReq,
  IUpdateMyworkingtimeReq,
  IWorking,
} from "../../interfaces/myworkingtime/myworkingtime";

export const getProjectsInTasksActions = createAsyncThunk(
  "/Myworkingtime/GetProjectsIncludingTasks",
  async () => {
    const response = {
      ...(await getProjectsInTasksApi()),
    };
    return response;
  }
);

export const submitToPendingActions = createAsyncThunk(
  "/Myworkingtime/SubmitToPending",
  async ({ startDate, endDate }: ISubmitToPendingReq) => {
    const submit = await submitToPendingApi({
      startDate,
      endDate,
    });
    return submit;
  }
);

export const getWorkingtimeOfUserActions = createAsyncThunk(
  "/Myworkingtime/GetWorkingtimeOfUser",
  async ({ startDate, endDate }: ISubmitToPendingReq) => {
    const submit = await getWorkingtimeOfUserApi({
      startDate,
      endDate,
    });
    return submit;
  }
);

export const createMyworkingTimeActions = createAsyncThunk(
  "/Myworkingtime/Create",
  async ({
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
    const create = await createMyworkingTimeApi({
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
    });
    return create as { result: IWorking };
  }
);

export const deleteMyWorkingtime = createAsyncThunk(
  "/Workingtime/Delete",
  async (id: number) => {
    const response = { ...(await deleteMyWorkingTimeApi(id)), id };
    return response;
  }
);

export const updateMyWorkingtimeActions = createAsyncThunk(
  "/Myworkingtime/Update",
  async ({
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
    const update = await updateMyWorkingtimeApi({
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
    });
    return update as { result: IUpdateMyworkingtimeReq };
  }
);
