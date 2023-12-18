import {IUser, IUsers} from '../Entities/User';
import {IResponse} from '../Entities/Utility';
import {ExecuteType, execute} from './Base';

const apiBaseName = 'users';

type changePasswordType = {
  oldPassword: string;
  password: string;
};
export const changePassword = async (
  oldPassword: string,
  password: string,
): Promise<IResponse<IUser>> => {
  const params: changePasswordType = {
    oldPassword,
    password,
  };
  const response = await execute<changePasswordType, IUsers>(
    apiBaseName,
    '/password',
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.users[0],
    error: response.error,
  };
};
