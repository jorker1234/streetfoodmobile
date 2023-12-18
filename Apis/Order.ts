import {ExecuteType, execute} from './Base';
import {IDeleteEntity, IResponse} from '../Entities/Utility';
import {IOrder, IOrders, OrderStatus} from '../Entities/Order';
import moment from 'moment-timezone';

const apiBaseName = 'orders';

type getOrderType = {
  shopId: string;
  status: OrderStatus;
};

type createOrderType = {
  shopId: string;
  customer: string;
};

export const getOrders = async (
  shopId: string,
  status: OrderStatus,
): Promise<IResponse<IOrders>> => {
  const params: getOrderType = {
    shopId,
    status,
  };
  const response = await execute<getOrderType, IOrders>(
    apiBaseName,
    '/',
    ExecuteType.GET,
    params,
  );
  return convertToFormatDateTime(response);
};

export const createOrder = async (
  params: createOrderType,
): Promise<IResponse<IOrder>> => {
  const response = await execute<createOrderType, IOrders>(
    apiBaseName,
    '/',
    ExecuteType.POST,
    params,
  );
  return {
    data: response.data?.orders[0],
    error: response.error,
  };
};

export const deleteOrder = async (
  id: string,
  shopId: string,
): Promise<IResponse<IOrder>> => {
  const params: IDeleteEntity = {
    id,
    shopId,
  };
  const response = await execute<IDeleteEntity, IOrders>(
    apiBaseName,
    `/${id}`,
    ExecuteType.DELETE,
    params,
  );
  return {
    data: response.data?.orders[0],
    error: response.error,
  };
};

const convertDateFormat = (dateInput: string) =>
  moment(dateInput).format('DD/MM/YYYY HH:mm');

const convertToFormatDateTime = (
  results: IResponse<IOrders>,
): IResponse<IOrders> => {
  const output = {...results};
  output.data?.orders.forEach(o => {
    o.createdAt = convertDateFormat(o.createdAt);
    o.updatedAt = convertDateFormat(o.updatedAt);
  });
  return output;
};
