import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserApi,
  deleteUserApi,
  getAll,
  ResetPasswordApi,
  updateUserApi,
} from "../../api/user";
import {
  ICreateUserReq,
  IResetPassword,
  IUserReq,
} from "../../interfaces/user/userType";

export const getAllActions = createAsyncThunk("/User/GetAll", async () => {
  const response = await getAll();
  return response;
});

export const deleteUserActions = createAsyncThunk(
  "/User/DeleteUser",
  async (id: number) => {
    const response = { ...(await deleteUserApi(id)), id };
    return response;
  }
);

export const createUserActions = createAsyncThunk(
  "/User/CreateUser",
  async ({
    id,
    userName,
    password,
    emailAddress,
    name,
    surname,
    fullName,
    address,
    phoneNumber,
    roleNames,
    avatarPath,
    type,
    branch,
    sex,
  }: ICreateUserReq) => {
    const create = await createUserApi({
      id,
      userName,
      password,
      emailAddress,
      name,
      surname,
      fullName,
      address,
      phoneNumber,
      roleNames,
      avatarPath,
      type,
      branch,
      sex,
    });
    return create as { result: IUserReq };
  }
);

export const updateUserActions = createAsyncThunk(
  "/User/UpdateUser",
  async ({
    id,
    userName,
    password,
    emailAddress,
    name,
    surname,
    fullName,
    address,
    phoneNumber,
    roleNames,
    avatarPath,
    type,
    branch,
    sex,
  }: ICreateUserReq) => {
    const update = await updateUserApi({
      id,
      userName,
      password,
      emailAddress,
      name,
      surname,
      fullName,
      address,
      phoneNumber,
      roleNames,
      avatarPath,
      type,
      branch,
      sex,
    });
    return update as { result: IUserReq };
  }
);

export const resetPasswordActions = createAsyncThunk(
  "/User/ResetPassword",
  async ({ userId, adminPassword, newPassword }: IResetPassword) => {
    const resetPassword = await ResetPasswordApi({
      userId,
      adminPassword,
      newPassword,
    });
    return resetPassword as { result: IResetPassword };
  }
);
