import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCommentApi, getCommentApi } from "../../api/comment";
import { ICommentReq, ICreateCommentReq } from "../../interfaces/comment/comment";

export const getComment = createAsyncThunk(
  "/Comment/GetAll",
  async (idWorkingtime: number) => {
    const response = { ...(await getCommentApi(idWorkingtime)), idWorkingtime };
    return response;
  }
);

export const createComment = createAsyncThunk(
  "/Comment/Save",
  async ({ id, title, idWorkingtime, userId }: ICreateCommentReq) => {
    const create = await createCommentApi({
      id,
      title,
      idWorkingtime,
      userId,
    });
    return create as { result: ICommentReq };
  }
);
