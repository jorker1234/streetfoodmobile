export interface IMenu {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface IShop {
  id: string;
  name: string;
  phone: string;
  receiveNumber: string;
  imageUrl: string;
}

export interface IOrderItem {
  id: string;
  shopId: string;
  menuId: string;
  quantity: number;
  note: string;
}

export interface IOrder {
  id: string;
  shopId: string;
  customer: string;
  items: IOrderItem[];
  status: string;
}

export interface IBillItem {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  amount: number;
  note: string;
}

export interface IBill {
  id: string;
  shopId: string;
  name: string;
  customer: string;
  amount: number;
  paymentNumber: string;
  items: IOrderItem[];
  status: string;
}

export interface IShopResponse {
  shops: IShop[];
}
