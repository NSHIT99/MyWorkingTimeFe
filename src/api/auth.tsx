import { IFormLoginRequest, IFormLoginResponse } from "../interfaces/auth/authType";
import { postApi } from "../utils/apiHelper";

const getAuthenticateApi = async ({
  userNameOrEmailAddress,
  password,
  rememberClient,
}: IFormLoginRequest) => {
  const data = await postApi<IFormLoginRequest, IFormLoginResponse>(
    `/TokenAuth/Authenticate`,
    { userNameOrEmailAddress, password, rememberClient }
  );
  return data;
};

export default getAuthenticateApi;
