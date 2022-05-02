import {
  IProjectsInTasksRes,
  ISubmitToPendingReq,
  ISubmitToPendingRes,
} from "../interfaces/myworkingtime/myworkingtime";
import { IDataError } from "../utils/apiError";
import { deleteApi, getApi, postApi } from "../utils/apiHelper";

export const getProjectsInTasksApi = async () => {
  const res = await getApi<IProjectsInTasksRes>(
    `Myworkingtime/GetProjectsIncludingTasks`
  );
  return res;
};

export const submitToPendingApi = async ({
  startDate,
  endDate,
  userId,
}: ISubmitToPendingReq) => {
  const res = await postApi<ISubmitToPendingReq, ISubmitToPendingRes | IDataError>(
    `/Myworkingtime/SubmitToPending`,
    {
      startDate,
      endDate,
      userId,
    }
  );
  return res;
};
