import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllWorkingtimeApi } from "../../api/workingtime";
import { IGetDateWorkingtime } from "../../interfaces/workingtime/workingtime";

export const getWorkingtime = createAsyncThunk(
  "/Project/GetAll",
  async ({ startDate, endDate, status }: IGetDateWorkingtime) => {
    const response = {
      ...(await getAllWorkingtimeApi({ startDate, endDate, status })),
    };
    return response;
  }
);
