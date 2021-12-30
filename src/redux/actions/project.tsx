import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActiveProjectApi, createProjectApi, deleteProjectApi, getInputProjectApi, getProjectApi, getUserNotPaggingApi, InactiveProjectApi } from "../../api/project";
import { IActiveProjectReq, ICreateProject, ICreateProjectRes, IGetProjectReq, IProjectSearch } from "../../interfaces/project/projectType";

export const getProject = createAsyncThunk(
  "/Project/GetAll",
  async ({ status, search }: IProjectSearch) => {
    const response = { ...(await getProjectApi({ status, search })) };
    return response;
  }
);

export const getInputProject = createAsyncThunk(
  "/Project/Get",
  async ({ input }: IGetProjectReq) => {
    const response = { ...(await getInputProjectApi({ input })) };
    return response;
  }
);

export const createProject = createAsyncThunk(
  "/Project/Save",
  async ({
    id,
    name,
    code,
    status,
    timeStart,
    timeEnd,
    note,
    projectType,
    customerId,
    tasks,
    users,
    projectTargetUsers,
    isAllUserBelongTo,
  }: ICreateProject) => {
    const response = await createProjectApi({
      id,
      name,
      code,
      status,
      timeStart,
      timeEnd,
      note,
      projectType,
      customerId,
      tasks,
      users,
      projectTargetUsers,
      isAllUserBelongTo,
    });
    return response as ICreateProjectRes;
  }
);

export const activeProject = createAsyncThunk(
  "/Project/Active", async ({ id }: IActiveProjectReq) => {
    const response = { ...(await ActiveProjectApi({ id })), id };
    return response;
  }
);

export const inactiveProject = createAsyncThunk(
  "/Project/Inactive", async ({ id }: IActiveProjectReq) => {
    const response = { ...(await InactiveProjectApi({ id })), id };
    return response;
  }
);

export const deleteProject = createAsyncThunk(
  "/Project/Delete",
  async (id: number) => {
    const response = { ...(await deleteProjectApi(id)), id };
    return response;
  }
);

export const getUserNotPagging = createAsyncThunk(
    "/User/GetUserNotPagging",
    async () => {
      const response = await getUserNotPaggingApi();
      return response;
    }
  );