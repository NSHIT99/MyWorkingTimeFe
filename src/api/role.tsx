import { IRoleRes, ICreateRoleReq } from "../interfaces/role/roleType";
import { IDeleteRes } from "../interfaces/type";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getAllRole = async () => {
  const res = await getApi<IRoleRes>(`/Role/GetAll`);
  return res;
};

export const createRoleApi = async ({ id, name, displayName, description }: ICreateRoleReq) => {
  const create = await postApi<ICreateRoleReq, IRoleRes | IDataError>(
    `/Role/Create`,
    {
      id,
      name,
      displayName,
      description,
    }
  );
  return create;
};

export const deleteRoleApi = async (id: number) => {
  const data = await deleteApi<IDeleteRes>(
    `/Role/Delete?id=${id}`
  );
  return data;
};

export const updateRoleApi = async ({ id, name, displayName, description }: ICreateRoleReq) => {
  const update = await postApi<ICreateRoleReq, IRoleRes | IDataError>(
    `/Role/Update`,
    {
      id,
      name,
      displayName,
      description,
    }
  );
  return update;
};