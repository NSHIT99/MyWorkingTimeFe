import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { IError } from "../../interfaces/auth/authType";
import { ICommentReq } from "../../interfaces/comment/comment";
import { createComment, getComment } from "../actions/comment";
import { RootState } from "../store";

export interface CommentState {
  comments: ICommentReq[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
  createProgress: string;
}

const initialState: CommentState = {
  comments: [],
  progress: "",
  success: false,
  createProgress: "",
  searchName: "",
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setSearchName: (state, action) => {
      state.searchName = action.payload.searchName;
    },
    resetCreateProgress(state) {
      state.createProgress = "";
    },
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
      .addCase(getComment.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.progress = "done";
        state.comments = action.payload.result;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(createComment.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.progress = "done";
        state.createProgress = "done";
        state.comments.push(action.payload.result);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.progress = "error";
        state.createProgress = "error";
      });
  },
});

const selectSelf = (state: RootState) => state.task;

export const commentSelector = {};

export const {
  resetProgress,
  resetSuccess,
  setSearchName,
  resetMessage,
  resetCreateProgress,
} = commentSlice.actions;

export default commentSlice.reducer;
