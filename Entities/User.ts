export interface IUser {
  username: string;
  name: string;
  role: string;
  token?: string;
  shopId?: string;
}

export interface IUsers {
  users: IUser[];
}
