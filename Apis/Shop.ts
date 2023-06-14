import {Asset} from 'react-native-image-picker';
import {IShop, IShopResponse} from '../Entities/Menu';
import config from '../config';
import axios from 'axios';

const api = axios.create({
  baseURL: `${config.API_URL}/api/shops`,
  withCredentials: true,
});

export const getShop = async (id: string): Promise<IShop> => {
  const result = await api.get<IShopResponse>(`/${id}`, {
    params: {
      id,
    },
  });
  return result.data?.shops[0];
};

// export const updateShop = (shop: IShop, photo?: Asset): IShop => {
//   return {} as IShop;
// };
