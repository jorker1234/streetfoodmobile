import {Asset} from 'react-native-image-picker';
import {ExecuteType, execute} from './Base';
import {IResponse} from '../Entities/Utility';
import {IShop, IShops} from '../Entities/Shop';

const apiBaseName = 'shops';

type getShopType = {
  id: string;
};
export const getShop = async (id: string): Promise<IResponse<IShop>> => {
  const params: getShopType = {
    id,
  };
  const response = await execute<getShopType, IShops>(
    apiBaseName,
    `/${id}`,
    ExecuteType.GET,
    params,
  );
  return {
    data: response.data?.shops[0],
    error: response.error,
  };
};

export const updateShop = async (
  shop: IShop,
  photo: Asset | null,
): Promise<IResponse<IShop>> => {
  const params = new FormData();
  if (photo?.uri) {
    params.append('file', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    });
  }
  params.append('name', shop.name);
  params.append('phone', shop.phone);
  params.append('receiveNumber', shop.receiveNumber);
  const response = await execute<FormData, IShops>(
    apiBaseName,
    `/${shop.id}`,
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.shops[0],
    error: response.error,
  };
};
