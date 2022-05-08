import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import { IError } from "../../interfaces/auth/authType";
import {
  IProjectsInTasksReq,
  IWorking,
  IWorkingtimeOfUser,
} from "../../interfaces/myworkingtime/myworkingtime";
import {
  createMyworkingTimeActions,
  getProjectsInTasksActions,
  getWorkingtimeOfUserActions,
  submitToPendingActions,
} from "../actions/myworkingtime";

export interface MyWorkingtimeState {
  projectsintasks: IProjectsInTasksReq[];
  workingtimeofuser: IWorkingtimeOfUser[];
  createMyworkingTime: IWorking[];
  messageSubmit: string;
  progress: string;
  createMyworkingTimeProgress: string;
  success: boolean;
  searchName: string;
  error: IError;
}

const initialState: MyWorkingtimeState = {
  projectsintasks: [],
  workingtimeofuser: [],
  createMyworkingTime: [],
  messageSubmit: "",
  progress: "",
  createMyworkingTimeProgress: "",
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
    createMyworkingTimeProgress(state) {
      state.createMyworkingTimeProgress = "";
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
        state.messageSubmit = action.payload.result;
        state.progress = "done";
      })
      .addCase(submitToPendingActions.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(getWorkingtimeOfUserActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getWorkingtimeOfUserActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.workingtimeofuser = action.payload.result;
      })
      .addCase(getWorkingtimeOfUserActions.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(createMyworkingTimeActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createMyworkingTimeActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.createMyworkingTimeProgress = "done";
        state.createMyworkingTime.push(action.payload.result);
      })
      .addCase(createMyworkingTimeActions.rejected, (state, action) => {
        state.progress = "error";
        state.createMyworkingTimeProgress = "error";
      });
  },
});

export const { resetProgress, resetSuccess, resetMessage } =
  myworkingtimeSlice.actions;

export default myworkingtimeSlice.reducer;
