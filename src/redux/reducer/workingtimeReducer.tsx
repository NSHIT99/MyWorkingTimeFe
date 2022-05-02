import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import { IError } from "../../interfaces/auth/authType";
import { getWorkingtime } from "../actions/workingtime";
import { IWorkingtimeReq } from "../../interfaces/workingtime/workingtime";

export interface WorkingtimeState {
  workingtimes: IWorkingtimeReq[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
}

const initialState: WorkingtimeState = {
  workingtimes: [],
  progress: "",
  success: false,
  searchName: "",
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
};

const workingtimeSlice = createSlice({
  name: "workingtime",
  initialState,
  reducers: {
    resetProgress(state) {
      state.progress = "";
    },
    resetSuccess(state) {
      state.success = false;
    },
    resetMessage(state) {
      state.error.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingtime.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getWorkingtime.fulfilled, (state, action) => {
        state.progress = "done";
        state.workingtimes = action.payload.result;
      })
      .addCase(getWorkingtime.rejected, (state, action) => {
        state.progress = "error";
      });
  },
});

const selectSelf = (state: RootState) => state.workingtime;
const getAllWorkingtimeSelector = createSelector(
  selectSelf,
  (state) => state.workingtimes
);

const getAllWorkingtimeStatus0 = createSelector(getAllWorkingtimeSelector, (workingtimes) =>
  workingtimes.filter((workingtimes) => workingtimes.status === 0)
);
const getAllWorkingtimeStatus1 = createSelector(getAllWorkingtimeSelector, (workingtimes) =>
  workingtimes.filter((workingtimes) => workingtimes.status === 1)
);
const getAllWorkingtimeStatus2 = createSelector(getAllWorkingtimeSelector, (workingtimes) =>
  workingtimes.filter((workingtimes) => workingtimes.status === 2)
);
const getAllWorkingtimeStatus3 = createSelector(getAllWorkingtimeSelector, (workingtimes) =>
  workingtimes.filter((workingtimes) => workingtimes.status === 3)
);

export const workingtimeSelector = {
  getAllWorkingtimeSelector,
  getAllWorkingtimeStatus0,
  getAllWorkingtimeStatus1,
  getAllWorkingtimeStatus2,
  getAllWorkingtimeStatus3,
};

export const { resetProgress, resetSuccess, resetMessage } =
  workingtimeSlice.actions;

export default workingtimeSlice.reducer;
