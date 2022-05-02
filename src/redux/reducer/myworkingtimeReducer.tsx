import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import { IError } from "../../interfaces/auth/authType";
import { IProjectsInTasksReq } from "../../interfaces/myworkingtime/myworkingtime";
import {
  getProjectsInTasksActions,
  submitToPendingActions,
} from "../actions/myworkingtime";

export interface MyWorkingtimeState {
  projectsintasks: IProjectsInTasksReq[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
}

const initialState: MyWorkingtimeState = {
  projectsintasks: [],
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

const myworkingtimeSlice = createSlice({
  name: "myworkingtime",
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
      .addCase(getProjectsInTasksActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getProjectsInTasksActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.projectsintasks = action.payload.result;
      })
      .addCase(getProjectsInTasksActions.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(submitToPendingActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(submitToPendingActions.fulfilled, (state, action) => {
        state.progress = "done";
      })
      .addCase(submitToPendingActions.rejected, (state, action) => {
        state.progress = "error";
      });
  },
});

const selectSelf = (state: RootState) => state.myworkingtime;
const getAllWorkingtimeSelector = createSelector(
  selectSelf,
  (state) => state.projectsintasks
);

export const { resetProgress, resetSuccess, resetMessage } =
  myworkingtimeSlice.actions;

export default myworkingtimeSlice.reducer;
