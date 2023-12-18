import {ExecuteType, execute} from './Base';
import {IResponse} from '../Entities/Utility';
import {IMenu, IMenus} from '../Entities/Menu';

const apiBaseName = 'menumaterials';

type updateMenuMaterialType = {
  id: string;
  shopId: string;
  materialId: string;
  quantity: number;
  note: string;
};

export const updateMenuMaterials = async (
  id: string,
  shopId: string,
  materialId: string,
  quantity: number,
  note: string,
): Promise<IResponse<IMenu>> => {
  const params: updateMenuMaterialType = {
    id,
    shopId,
    materialId,
    quantity,
    note,
  };
  const response = await execute<updateMenuMaterialType, IMenus>(
    apiBaseName,
    `/${id}/materials/${materialId}`,
    ExecuteType.PUT,
    params,
  );
  return {
    data: response.data?.menus[0],
    error: response.error,
  };
};
