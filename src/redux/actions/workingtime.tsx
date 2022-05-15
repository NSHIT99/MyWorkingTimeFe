import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  approveWorkingtimesApi,
  getAllWorkingtimeApi,
  rejectWorkingtimesApi,
} from "../../api/workingtime";
import {
  IApproveWorkingtimesReq,
  IGetDateWorkingtime,
  IRejectWorkingtimesReq,
} from "../../interfaces/workingtime/workingtime";

export const getWorkingtime = createAsyncThunk(
  "/Project/GetAll",
  async ({ startDate, endDate, status }: IGetDateWorkingtime) => {
    const response = {
      ...(await getAllWorkingtimeApi({ startDate, endDate, status })),
    };
    return response;
  }
);

export const approveWorkingtimesActions = createAsyncThunk(
  "/Workingtime/ApproveWorkingtimes",
  async ({ idApprove }: IApproveWorkingtimesReq) => {
    const submit = await approveWorkingtimesApi({
      idApprove,
    });
    return submit;
  }
);

export const rejectWorkingtimesActions = createAsyncThunk(
  "/Workingtime/RejectWorkingtimes",
  async ({ idReject }: IRejectWorkingtimesReq) => {
    const submit = await rejectWorkingtimesApi({
      idReject,
    });
    return submit;
  }
);

