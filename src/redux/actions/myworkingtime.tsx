import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectsInTasksApi,
  submitToPendingApi,
} from "../../api/myworkingtime";
import { ISubmitToPendingReq } from "../../interfaces/myworkingtime/myworkingtime";

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
  async ({ startDate, endDate, userId }: ISubmitToPendingReq) => {
    const submit = await submitToPendingApi({
      startDate,
      endDate,
      userId,
    });
    return submit;
  }
);
