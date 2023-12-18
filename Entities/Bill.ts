export interface IBillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  description: string;
  note: string;
}

export interface IBill {
  id: string;
  shopId: string;
  orderId: string;
  name: string;
  sequence: string;
  customer: string;
  status: string;
  amount: number;
  promptpay: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  items: IBillItem[];
}

export interface IBills {
  bills: IBill[];
}

export enum BillStatus {
  INITIALIZE = 'initialize',
  PAYMENT = 'payment',
  QUEUE = 'queue',
  COMPLETE = 'complete',
  REJECT = 'reject',
  CANCEL = 'cancel',
}
