import {
  ICommentRes,
  ICreateCommentReq,
  ICreateCommentRes,
} from "../interfaces/comment/comment";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getCommentApi = async (idWorkingtime: number) => {
  let url = `/Comment/Get?`;
  if (typeof idWorkingtime === "number")
    url += `idWorkingtime=${idWorkingtime}`;
  const data = await getApi<ICommentRes>(url);
  return data;
};

export const createCommentApi = async ({
  id,
  title,
  idWorkingtime,
  userId,
}: ICreateCommentReq) => {
  const create = await postApi<
    ICreateCommentReq,
    ICreateCommentRes | IDataError
  >(`/Comment/Create`, {
    id,
    title,
    idWorkingtime,
    userId,
  });
  return create;
};
