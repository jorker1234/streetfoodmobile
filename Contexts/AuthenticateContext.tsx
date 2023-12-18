import React, {createContext, useCallback, useContext, useState} from 'react';
import {IUser} from '../Entities/User';
import {authenticate, signin} from '../Apis/Auth';
import Keychain from 'react-native-keychain';
import config from '../config';
import {IResponse} from '../Entities/Utility';

type Props = {
  children: JSX.Element;
};

type AuthenticateStore = {
  user: IUser | null;
  signin: (username: string, password: string) => Promise<IResponse<IUser>>;
  signout: () => Promise<void>;
  authen: () => Promise<IResponse<IUser>>;
};

const AuthenticateContext = createContext<AuthenticateStore>(
  {} as AuthenticateStore,
);

export const useAuthenticate = () => {
  return useContext(AuthenticateContext);
};

const AuthenticateProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const login = useCallback(
    async (username: string, password: string) => {
      const result = await signin(username, password);
      if (result.data) {
        const {token, ...userData} = result.data;
        setUser(userData);
        if (token) {
          await Keychain.setGenericPassword(config.CREDENTIAL_KEY, token);
        }
      }
      return result;
    },
    [setUser],
  );
  const signout = useCallback(async () => {
    setUser(null);
    await Keychain.resetGenericPassword();
  }, [setUser]);
  const authen = useCallback(async () => {
    const result = await authenticate();
    if (result.data) {
      const {token, ...userData} = result.data;
      setUser(userData);
      if (token) {
        await Keychain.setGenericPassword(config.CREDENTIAL_KEY, token);
      }
    }
    return result;
  }, [setUser]);

  const store = {user, signin: login, signout, authen};
  return (
    <AuthenticateContext.Provider value={store}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateProvider;
