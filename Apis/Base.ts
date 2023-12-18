import {IException, IExceptionResponse, IResponse} from '../Entities/Utility';
import config from '../config';
import axios, {AxiosError} from 'axios';
import Keychain from 'react-native-keychain';

export const getApi = async (name: string) => {
  const credentials = await Keychain.getGenericPassword();
  const options: any = {};
  if (credentials) {
    options.headers = {Authorization: 'Bearer ' + credentials.password};
  }
  return axios.create({
    baseURL: `${config.API_URL}/api/${name}`,
    withCredentials: true,
    ...options,
  });
};

export const getException = (error: unknown) => {
  const err = error as AxiosError<IExceptionResponse>;
  return (
    err.response?.data?.error ??
    ({status: 500, message: 'Someting went wrong.'} as IException)
  );
};

export const isException = (data: IException | any) => {
  return (
    (data as IException).status !== undefined &&
    (data as IException).message !== undefined
  );
};

export enum ExecuteType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const execute = async <TParams, TResponse>(
  name: string,
  endpoint: string,
  executeType: ExecuteType,
  params?: TParams,
): Promise<IResponse<TResponse>> => {
  try {
    const api = await getApi(name);
    let result;
    switch (executeType) {
      case ExecuteType.GET:
        result = await api.get<TResponse>(endpoint, {params});
        break;
      case ExecuteType.POST:
        result = await api.post<TResponse>(endpoint, params);
        break;
      case ExecuteType.PUT:
        result = await api.put<TResponse>(endpoint, params);
        break;
      case ExecuteType.DELETE:
        result = await api.delete<TResponse>(endpoint, {params});
        break;
      default:
        break;
    }
    const data = result?.data;
    return {
      data,
    } as IResponse<TResponse>;
  } catch (err) {
    const error = getException(err);
    return {
      error,
    } as IResponse<TResponse>;
  }
};
