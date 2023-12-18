import {IUser, IUsers} from '../Entities/User';
import {IResponse} from '../Entities/Utility';
import {ExecuteType, execute} from './Base';

const apiBaseName = 'auth';

type signinType = {
  username: string;
  password: string;
};
export const signin = async (
  username: string,
  password: string,
): Promise<IResponse<IUser>> => {
  const params: signinType = {
    username,
    password,
  };
  const response = await execute<signinType, IUsers>(
    apiBaseName,
    '/signin',
    ExecuteType.POST,
    params,
  );
  return {
    data: response.data?.users[0],
    error: response.error,
  };
};

export const authenticate = async (): Promise<IResponse<IUser>> => {
  const response = await execute<{}, IUsers>(apiBaseName, '/', ExecuteType.GET);
  return {
    data: response.data?.users[0],
    error: response.error,
  };
};
