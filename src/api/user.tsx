import { IDeleteRes } from "../interfaces/type";
import { ICreateUserReq, IUserRes } from "../interfaces/user/userType";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi, putApi } from "../utils/apiHelper";

export const getAll = async () => {
  const res = await getApi<IUserRes>(`/User/GetAll`);
  return res;
};

export const deleteUserApi = async (id: number) => {
  const data = await deleteApi<IDeleteRes>(`/User/DeleteUser?id=${id}`);
  return data;
};

export const createUserApi = async ({
  id,
  userName,
  password,
  emailAddress,
  name,
  surname,
  address,
  phoneNumber,
  roleNames,
  avatarPath,
  type,
  branch,
  sex,
}: ICreateUserReq) => {
  const create = await postApi<ICreateUserReq, IUserRes | IDataError>(
    `/User/CreateUser`,
    {
      id,
      userName,
      password,
      emailAddress,
      name,
      surname,
      address,
      phoneNumber,
      roleNames,
      avatarPath,
      type,
      branch,
      sex,
    }
  );
  return create;
};

export const updateUserApi = async ({
  id,
  userName,
  password,
  emailAddress,
  name,
  surname,
  address,
  phoneNumber,
  roleNames,
  avatarPath,
  type,
  branch,
  sex,
}: ICreateUserReq) => {
  const update = await putApi<ICreateUserReq, IUserRes | IDataError>(
    `/User/UpdateUser`,
    {
      id,
      userName,
      password,
      emailAddress,
      name,
      surname,
      address,
      phoneNumber,
      roleNames,
      avatarPath,
      type,
      branch,
      sex,
    }
  );
  return update;
};
