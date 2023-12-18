import {ExecuteType, execute} from './Base';
import {IResponse} from '../Entities/Utility';
import {IBill, IBills, BillStatus} from '../Entities/Bill';
import moment from 'moment-timezone';

const apiBaseName = 'bills';

type queryBillType = {
  shopId: string;
  status: BillStatus;
};

type getBillType = {
  id: string;
  shopId: string;
  orderId: string;
};

type updateBillStatusType = {
  id: string;
  shopId: string;
  orderId: string;
  status: BillStatus;
};

export const getBills = async (
  shopId: string,
  status: BillStatus,
): Promise<IResponse<IBills>> => {
  const params: queryBillType = {
    shopId,
    status,
  };
  const response = await execute<queryBillType, IBills>(
    apiBaseName,
    '/',
    ExecuteType.GET,
    params,
  );
  return convertToFormatDateTime(response);
};

export const getBill = async (
  id: string,
  shopId: string,
  orderId: string,
): Promise<IResponse<IBill>> => {
  const params: getBillType = {
    id,
    shopId,
    orderId,
  };
  let response = await execute<getBillType, IBills>(
    apiBaseName,
    `/${id}`,
    ExecuteType.GET,
    params,
  );
  response = convertToFormatDateTime(response);
  return {
    data: response.data?.bills[0],
    error: response.error,
  };
};

export const updateBillStatus = async (
  id: string,
  shopId: string,
  orderId: string,
  status: BillStatus,
): Promise<IResponse<IBill>> => {
  const params: updateBillStatusType = {
    id,
    shopId,
    orderId,
    status,
  };
  const response = await execute<updateBillStatusType, IBills>(
    apiBaseName,
    `/${id}`,
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.bills[0],
    error: response.error,
  };
};

const convertDateFormat = (dateInput: string) =>
  moment(dateInput).format('DD/MM/YYYY HH:mm');

const convertToFormatDateTime = (
  results: IResponse<IBills>,
): IResponse<IBills> => {
  const output = {...results};
  output.data?.bills.forEach(o => {
    o.createdAt = convertDateFormat(o.createdAt);
    o.updatedAt = convertDateFormat(o.updatedAt);
  });
  return output;
};
