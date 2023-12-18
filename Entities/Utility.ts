export interface IExceptionResponse {
  error: IException;
}

export interface IException {
  status: number;
  message: string;
}

export interface IResponse<T> {
  data?: T;
  error?: IException;
}

export interface IDeleteEntity {
  id: string;
  shopId: string;
}

export enum ApiStatus {
  PENDING,
  COMPLETE,
  ERROR,
}

export enum ActionType {
  NONE,
  LOAD,
  CREATE,
  UPDATE,
  DELETE,
}
