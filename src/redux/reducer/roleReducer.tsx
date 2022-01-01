import { createSlice } from "@reduxjs/toolkit";
import { IError } from "../../interfaces/auth/authType";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IRoleReq } from "../../interfaces/role/roleType";
import {
  createRoleActions,
  deleteRoleActions,
  getAllRoleActions,
  updateRoleActions,
} from "../actions/role";

export interface IRoleState {
  roles: IRoleReq[];
  createRole: IRoleReq[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
  createProgress: string;
  updateProgress: string;
}

const initialState: IRoleState = {
  progress: "",
  createProgress: "",
  updateProgress: "",
  success: false,
  searchName: "",
  roles: [],
  createRole: [],
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetProgress(state) {
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
      .addCase(createRoleActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createRoleActions.fulfilled, (state, action) => {
        state.createProgress = "done";
        state.progress = "done";
        state.roles.push(action.payload.result);
      })
      .addCase(createRoleActions.rejected, (state, action) => {
        state.progress = "error";
        state.createProgress = "error";
        state.error.message = action.payload as string;
      });
    builder
      .addCase(updateRoleActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(updateRoleActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.updateProgress = "done";
        state.roles.find((role) => role.id === action.payload.result.id);
        state.roles = state.roles.map((role) => {
          if (role.id === action.payload.result.id) {
            role.name = action.payload.result.name;
            role.displayName = action.payload.result.displayName;
            role.description = action.payload.result.description;
          }
          return role;
        });
      })
      .addCase(updateRoleActions.rejected, (state, action) => {
        state.progress = "error";
        state.updateProgress = "error";
        state.error.message = action.payload as string;
      });
    builder
      .addCase(deleteRoleActions.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deleteRoleActions.fulfilled, (state, action) => {
        state.progress = "done";
        state.roles = state.roles.filter(
          (role) => role.id !== action.payload.id
        );
      })
      .addCase(deleteRoleActions.rejected, (state, action) => {
        state.progress = "error";
      });
  },
});

const selectSelf = (state: RootState) => state.role;

const getAllRoleSelector = createSelector(selectSelf, (state) => state.roles);

export const roleSelector = {
  getAllRoleSelector,
};

export const {
  resetProgress,
  resetSuccess,
  resetMessage,
  resetCreateProgress,
  resetUpdateProgress,
} = roleSlice.actions;

export default roleSlice.reducer;
