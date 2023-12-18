export interface IShop {
  id: string;
  name: string;
  phone: string;
  receiveNumber: string;
  imageUrl: string;
  promptpay: string;
}

export interface IShops {
  shops: IShop[];
}
