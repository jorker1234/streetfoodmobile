import React, {createContext, useContext} from 'react';
import {useRoute} from '@react-navigation/native';

type Props = {
  children: JSX.Element;
  params?: Readonly<object | undefined>;
};

const RouterParamContext = createContext<Readonly<object | undefined>>({});

export const useRouterParam = () => {
  return useContext(RouterParamContext);
};

const RouterParamProvider: React.FC<Props> = ({children}) => {
  const route = useRoute();
  //const params = useMemo(() => route.params || {}, [route.params]);
  const params = route.params || {};
  return (
    <RouterParamContext.Provider value={params}>
      {children}
    </RouterParamContext.Provider>
  );
};

export default RouterParamProvider;
