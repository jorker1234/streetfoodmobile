export interface IOrderItem {
  id: string;
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
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  orders: IOrder[];
}

export enum OrderStatus {
  INITIALIZE = 'initialize',
  PAYMENT_REQUEST = 'paymentRequest',
  PAYMENT_COMMIT = 'paymentCommit',
  QUEUE = 'queue',
  COMPLETE = 'complete',
}
