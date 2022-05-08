import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMyworkingTimeApi,
  getProjectsInTasksApi,
  getWorkingtimeOfUserApi,
  submitToPendingApi,
} from "../../api/myworkingtime";
import {
  ISubmitToPendingReq,
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
