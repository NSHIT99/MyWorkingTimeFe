import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRoleApi, deleteRoleApi, getAllRole, updateRoleApi } from "../../api/role";
import { IRoleReq, ICreateRoleReq } from "../../interfaces/role/roleType";

export const getAllRoleActions = createAsyncThunk("/Role/GetAll", async () => {
  const response = await getAllRole();
  return response;
});

export const createRoleActions = createAsyncThunk(
  "/Role/Create",
  async ({ id, name, displayName, description }: ICreateRoleReq) => {
    const create = await createRoleApi({
      id,
      name,
      displayName,
      description,
    });
    return create as { result: IRoleReq };
  }
);

export const deleteRoleActions = createAsyncThunk(
  "/Role/Delete",
  async (id: number) => {
    const response = { ...(await deleteRoleApi(id)), id };
    return response;
  }
);

export const updateRoleActions = createAsyncThunk(
  "/Role/Update",
  async ({ id, name, displayName, description }: ICreateRoleReq) => {
    const update = await updateRoleApi({
      id,
      name,
      displayName,
      description,
    });
    return update as { result: IRoleReq };
  }
);