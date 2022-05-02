import {
  IGetDateWorkingtime,
  IWorkingtimeRes,
} from "../interfaces/workingtime/workingtime";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getAllWorkingtimeApi = async ({
  startDate,
  endDate,
  status,
}: IGetDateWorkingtime) => {
  const res = await getApi<IWorkingtimeRes>(
    `/Workingtime/GetAll?startDate=${startDate}&endDate=${endDate}&status=${status}`
  );
  return res;
};
