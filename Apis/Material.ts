import {ExecuteType, execute} from './Base';
import {IDeleteEntity, IResponse} from '../Entities/Utility';
import {IMaterial, IMaterials} from '../Entities/Material';

const apiBaseName = 'materials';

type getMaterialType = {
  shopId: string;
};
export const getMaterials = async (
  shopId: string,
): Promise<IResponse<IMaterials>> => {
  const params: getMaterialType = {
    shopId,
  };
  const response = await execute<getMaterialType, IMaterials>(
    apiBaseName,
    '/',
    ExecuteType.GET,
    params,
  );
  return response;
};

export const getMaterialByMenuId = async (
  shopId: string,
  menuId: string,
): Promise<IResponse<IMaterials>> => {
  const params: getMaterialType = {
    shopId,
  };
  const response = await execute<getMaterialType, IMaterials>(
    apiBaseName,
    `/menus/${menuId}`,
    ExecuteType.GET,
    params,
  );
  return response;
};

export const createMaterial = async (
  material: IMaterial,
): Promise<IResponse<IMaterial>> => {
  const response = await execute<IMaterial, IMaterials>(
    apiBaseName,
    '/',
    ExecuteType.POST,
    material,
  );
  return {
    data: response.data?.materials[0],
    error: response.error,
  };
};

export const updateMaterial = async (
  material: IMaterial,
): Promise<IResponse<IMaterial>> => {
  const response = await execute<IMaterial, IMaterials>(
    apiBaseName,
    `/${material.id}`,
    ExecuteType.PUT,
    material,
  );
  return {
    data: response.data?.materials[0],
    error: response.error,
  };
};

export const deleteMaterial = async (
  id: string,
  shopId: string,
): Promise<IResponse<IMaterial>> => {
  const params: IDeleteEntity = {
    id,
    shopId,
  };
  const response = await execute<IDeleteEntity, IMaterials>(
    apiBaseName,
    `/${id}`,
    ExecuteType.DELETE,
    params,
  );
  return {
    data: response.data?.materials[0],
    error: response.error,
  };
};
