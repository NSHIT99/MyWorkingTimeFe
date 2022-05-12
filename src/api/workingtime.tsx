import {
  IApproveWorkingtimesReq,
  IGetDateWorkingtime,
  IRejectWorkingtimesReq,
  IResultApproveWorkingtimesRes,
  IResultRejectWorkingtimesRes,
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

export const approveWorkingtimesApi = async ({
  idApprove,
}: IApproveWorkingtimesReq) => {
  const res = await postApi<IApproveWorkingtimesReq, IResultApproveWorkingtimesRes>(
    `/Workingtime/ApproveWorkingtimes`,
    {
      idApprove,
    }
  );
  return res;
};

export const rejectWorkingtimesApi = async ({
  idReject,
}: IRejectWorkingtimesReq) => {
  const res = await postApi<IRejectWorkingtimesReq, IResultRejectWorkingtimesRes>(
    `/Workingtime/RejectWorkingtimes`,
    {
      idReject,
    }
  );
  return res;
};