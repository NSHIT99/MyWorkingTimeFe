import {
  IActiveProjectReq,
  ICreateProject,
  ICreateProjectRes,
  IDeleteProjectRes,
  IGetProjectReq,
  IProjectRes,
  IProjectSearch,
} from "../interfaces/project/projectType";
import { IUserNotPaggingRes } from "../interfaces/user/userType";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getProjectApi = async ({ status, search }: IProjectSearch) => {
  let url = `/Project/GetAll?`;
  if (typeof status === "number") url += `status=${status}`;
  const res = await getApi<IProjectRes>(url);
  return res;
};

export const createProjectApi = async ({
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
  const data = await postApi<ICreateProject, ICreateProjectRes>(
    `/Project/Save`,
    {
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
    }
  );
  return data;
};

export const ActiveProjectApi = async ({ id }: IActiveProjectReq) => {
  const data = await postApi<IActiveProjectReq, IDeleteProjectRes>(
    `/Project/Active?Id=${id}`,
    {
      id,
    }
  );
  return data;
};

export const InactiveProjectApi = async ({ id }: IActiveProjectReq) => {
  const data = await postApi<IActiveProjectReq, IDeleteProjectRes>(
    `/Project/Inactive?Id=${id}`,
    {
      id,
    }
  );
  return data;
};

export const deleteProjectApi = async (id: number) => {
  let url = `/Project/Delete?`;
  if (typeof id === "number") url += `Id=${id}`;
  const data = await deleteApi<IDeleteProjectRes>(url);
  return data;
};

export const getInputProjectApi = async ({ input }: IGetProjectReq) => {
  let url = `/Project/Get?`;
  if (typeof input === "number") url += `input=${input}`;
  const data = await getApi<ICreateProjectRes>(url);
  return data;
};

export const getUserNotPaggingApi = async () => {
  const res = await getApi<IUserNotPaggingRes>(`/User/GetUserNotPagging`);
  return res;
};
