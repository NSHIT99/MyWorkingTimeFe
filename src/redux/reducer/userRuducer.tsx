import { createSlice } from "@reduxjs/toolkit";
import { IError } from "../../interfaces/auth/authType";
import { IGetAllReq, IUserReq } from "../../interfaces/user/userType";
import {
  createUserActions,
  deleteUserActions,
  getAllActions,
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
}

const initialState: IUserState = {
  progress: "",
  success: false,
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
        state.users.push(action.payload.result);
      })
      .addCase(createUserActions.rejected, (state, action) => {
        state.progress = "error";
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
  },
});

const selectSelf = (state: RootState) => state.user;

const getAllUserSelector = createSelector(selectSelf, (state) => state.users);
const progressSelector = createSelector(selectSelf, (state) => state.progress);

export const userSelector = {
  getAllUserSelector,
  progressSelector,
};

export const { resetUserProgress, resetSuccess, resetMessage } = userSlice.actions;

export default userSlice.reducer;
