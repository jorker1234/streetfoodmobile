export interface IMenu {
  id: string;
  shopId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isHidden: boolean;
}

export interface IMenus {
  menus: IMenu[];
}
