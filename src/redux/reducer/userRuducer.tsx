import { createSlice } from "@reduxjs/toolkit";
import { IError } from "../../interfaces/auth/authType";
import { IGetAllReq, IUserReq } from "../../interfaces/user/userType";
import {
  createUserActions,
  deleteUserActions,
  getAllActions,
  updateUserActions,
} from "../actions/user";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IRoleReq } from "../../interfaces/role/roleType";
import { getAllRoleActions } from "../actions/role";

export interface IUserState {
  users: IGetAllReq[];
  createUser: IUserReq[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
  roles: IRoleReq[];
  createProgress: string;
  updateProgress: string;
}

const initialState: IUserState = {
  progress: "",
  success: false,
  createProgress: "",
  updateProgress: "",
  searchName: "",
  users: [],
  createUser: [],
  roles: [],
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserProgress(state) {
      state.progress = "";
    },
    resetCreateProgress(state) {
      state.createProgress = "";
    },
    resetUpdateProgress(state) {
      state.updateProgress = "";
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
      .addCase(getAllActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getAllActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.users = action.payload.result;
      })
      .addCase(getAllActions.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(getAllRoleActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getAllRoleActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.roles = action.payload.result;
      })
      .addCase(getAllRoleActions.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(createUserActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createUserActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.createProgress = "done";
        state.users.push(action.payload.result);
      })
      .addCase(createUserActions.rejected, (state, action) => {
        state.progress = "error";
        state.createProgress = "error";
      });
    builder
      .addCase(deleteUserActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deleteUserActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteUserActions.rejected, (state, action) => {
        state.progress = "error";
      });
      builder
      .addCase(updateUserActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(updateUserActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.updateProgress = "done";
        state.users.find((user) => user.id === action.payload.result.id);
        state.users = state.users.map((user) => {
          if (user.id === action.payload.result.id) {
            user.name = action.payload.result.name;
            user.userName = action.payload.result.userName;
            user.emailAddress = action.payload.result.emailAddress;
            user.name = action.payload.result.name;
            user.surname = action.payload.result.surname;
            user.address = action.payload.result.address;
            user.phoneNumber = action.payload.result.phoneNumber;
            user.avatarPath = action.payload.result.avatarPath;
            user.type = action.payload.result.type;
            user.branch = action.payload.result.branch;
            user.sex = action.payload.result.sex;
          }
          return user;
        });
      })
      .addCase(updateUserActions.rejected, (state, action) => {
        state.progress = "error";
        state.updateProgress = "error";
        state.error.message = action.payload as string;
      });
  },
});

const selectSelf = (state: RootState) => state.user;

const getAllUserSelector = createSelector(selectSelf, (state) => state.users);
const progressSelector = createSelector(selectSelf, (state) => state.progress);

export const userSelector = {
  getAllUserSelector,
  progressSelector,
};

export const {
  resetUserProgress,
  resetSuccess,
  resetMessage,
  resetCreateProgress,
  resetUpdateProgress,
} = userSlice.actions;

export default userSlice.reducer;
