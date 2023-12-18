export interface IMaterial {
  id: string;
  shopId: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  quantity?: number;
  note?: string;
}

export interface IMaterials {
  materials: IMaterial[];
}
