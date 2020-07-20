export interface IDataFetchState<T = any> {
  isFetching: boolean;
  hasError: boolean;
  isSuccess: boolean;
  error: IErrorState;
  data: T;
}

export interface IErrorState {
  errorMessage?: string;
  errorNumber?: number;
}

export interface IBusinessError {
  code?: string;
  message?: string;
  details?: any;
}
