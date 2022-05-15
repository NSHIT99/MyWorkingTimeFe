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
  deleteMyWorkingtime,
  getProjectsInTasksActions,
  getWorkingtimeOfUserActions,
  submitToPendingActions,
  updateMyWorkingtimeActions,
} from "../actions/myworkingtime";

export interface MyWorkingtimeState {
  projectsintasks: IProjectsInTasksReq[];
  myworkingtimes: IWorking[];
  workingtimeofuser: IWorkingtimeOfUser[];
  createMyworkingTime: IWorking[];
  messageSubmit: string;
  progress: string;
  updateProgress: string;
  createMyworkingTimeProgress: string;
  success: boolean;
  searchName: string;
  error: IError;
  acceptId: number[];
}

const initialState: MyWorkingtimeState = {
  projectsintasks: [],
  myworkingtimes: [],
  workingtimeofuser: [],
  createMyworkingTime: [],
  messageSubmit: "",
  progress: "",
  updateProgress: "",
  createMyworkingTimeProgress: "",
  success: false,
  searchName: "",
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
  acceptId: [],
};

const myworkingtimeSlice = createSlice({
  name: "myworkingtime",
  initialState,
  reducers: {
    resetUpdateProgress(state) {
      state.updateProgress = "";
    },
    resetProgress(state) {
      state.progress = "";
    },
    resetCreateMyworkingTimeProgress(state) {
      state.createMyworkingTimeProgress = "";
    },
    resetSuccess(state) {
      state.success = false;
    },
    resetMessage(state) {
      state.error.message = "";
    },
    setAcceptId(state, action) {
      state.acceptId = action.payload;
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
    builder
      .addCase(deleteMyWorkingtime.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deleteMyWorkingtime.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.myworkingtimes = state.myworkingtimes.filter(
            (myworkingtime) => myworkingtime.id !== action.payload.id
          );
        } else {
          state.error.message = action.payload.error.message;
        }
      })
      .addCase(deleteMyWorkingtime.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(updateMyWorkingtimeActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(updateMyWorkingtimeActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.updateProgress = "done";
        state.myworkingtimes.find(
          (myworkingtime) => myworkingtime.id === action.payload.result.id
        );
        state.myworkingtimes = state.myworkingtimes.map((myworkingtime) => {
          if (myworkingtime.id === action.payload.result.id) {
            myworkingtime.projectTaskId = action.payload.result.projectTaskId;
            myworkingtime.note = action.payload.result.note;
            myworkingtime.workingTime = action.payload.result.workingTime;
            myworkingtime.status = action.payload.result.status;
            myworkingtime.typeOfWork = action.payload.result.typeOfWork;
            myworkingtime.createdAt = action.payload.result.createdAt;
            myworkingtime.dateAt = action.payload.result.dateAt;
            myworkingtime.userId = action.payload.result.userId;
            myworkingtime.updatedAt = action.payload.result.updatedAt;
          }
          return myworkingtime;
        });
      })
      .addCase(updateMyWorkingtimeActions.rejected, (state, action) => {
        state.progress = "error";
        state.updateProgress = "error";
        state.error.message = action.payload as string;
      });
  },
});

export const {
  resetProgress,
  resetSuccess,
  resetMessage,
  resetCreateMyworkingTimeProgress,
  setAcceptId,
  resetUpdateProgress,
} = myworkingtimeSlice.actions;

export default myworkingtimeSlice.reducer;
