import {Asset} from 'react-native-image-picker';
import {ExecuteType, execute} from './Base';
import {IDeleteEntity, IResponse} from '../Entities/Utility';
import {IMenu, IMenus} from '../Entities/Menu';

const apiBaseName = 'menus';

type getMenuType = {
  shopId: string;
};
export const getMenus = async (shopId: string): Promise<IResponse<IMenus>> => {
  const params: getMenuType = {
    shopId,
  };
  const response = await execute<getMenuType, IMenus>(
    apiBaseName,
    '/',
    ExecuteType.GET,
    params,
  );
  return response;
};

export const createMenu = async (
  menu: IMenu,
  photo: Asset | null,
): Promise<IResponse<IMenu>> => {
  const params = new FormData();
  if (photo?.uri) {
    params.append('file', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    });
  }
  params.append('shopId', menu.shopId);
  params.append('name', menu.name);
  params.append('price', menu.price);
  params.append('description', menu.description);
  const response = await execute<FormData, IMenus>(
    apiBaseName,
    '/',
    ExecuteType.POST,
    params,
  );
  return {
    data: response.data?.menus[0],
    error: response.error,
  };
};

export const updateMenu = async (
  menu: IMenu,
  photo: Asset | null,
): Promise<IResponse<IMenu>> => {
  const params = new FormData();
  if (photo?.uri) {
    params.append('file', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    });
  }
  params.append('shopId', menu.shopId);
  params.append('name', menu.name);
  params.append('price', menu.price);
  params.append('description', menu.description);
  const response = await execute<FormData, IMenus>(
    apiBaseName,
    `/${menu.id}`,
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.menus[0],
    error: response.error,
  };
};

export const updateMenuHidden = async (
  id: String,
  shopId: string,
  isHidden: boolean,
): Promise<IResponse<IMenu>> => {
  const params = new FormData();
  params.append('shopId', shopId);
  params.append('isHidden', isHidden);
  const response = await execute<FormData, IMenus>(
    apiBaseName,
    `/${id}`,
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.menus[0],
    error: response.error,
  };
};

export const deleteMenu = async (
  id: string,
  shopId: string,
): Promise<IResponse<IMenu>> => {
  const params: IDeleteEntity = {
    id,
    shopId,
  };
  const response = await execute<IDeleteEntity, IMenus>(
    apiBaseName,
    `/${id}`,
    ExecuteType.DELETE,
    params,
  );
  return {
    data: response.data?.menus[0],
    error: response.error,
  };
};
