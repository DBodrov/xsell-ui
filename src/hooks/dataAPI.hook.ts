import { useReducer, useEffect, useState, useCallback } from 'react';
import { Method, AxiosError, AxiosResponse } from 'axios';
import { DataService } from 'services';
import { IDataFetchState, IErrorState, IBusinessError } from 'typings';

type TResponseData = Pick<AxiosResponse, 'data'>;

type Actions =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: TResponseData }
  | { type: 'FETCH_FAILURE'; payload: IErrorState };

interface IRequestConfig<T = any> {
  url: string;
  method?: Method;
  headers?: IKeyValue;
  params?: IKeyValue;
  body?: T;
}

const initialDataState: IDataFetchState = {
  isFetching: false,
  hasError: false,
  isSuccess: false,
  error: {},
  data: undefined,
} as const;

const dataFetchReducer = (state = initialDataState, action: Actions) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        hasError: false,
        error: {},
        data: undefined,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        hasError: false,
        data: action.payload.data,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        hasError: true,
        error: {
          errorMessage: action.payload.errorMessage,
          errorNumber: action.payload.errorNumber,
        },
        data: undefined,
      };
    default:
      throw new Error('Action not found');
  }
};
// TODO: Вынести в сервис / утилиту
export const errorHandler = (error: AxiosError<IBusinessError>): IErrorState => {
  console.error({ error });

  if (error?.response?.status >= 500) {
    return {
      errorMessage: 'Что то пошло не так',
      errorNumber: error?.response?.status,
    };
  }
  if (error?.response?.status === 409) {
    return {
      errorMessage: error?.response?.data?.code,
      errorNumber: error?.response?.status,
    };
  }
  return {
    errorMessage: error?.message,
    errorNumber: error?.response?.status,
  };
};

export function useDataApi<U = any>() {
  const [reqConfig, setReqConfig] = useState<IRequestConfig>(null);

  const [state, dispatch] = useReducer<React.Reducer<IDataFetchState<U>, Actions>>(
    dataFetchReducer,
    initialDataState
  );

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({
        type: 'FETCH_INIT',
      });

      try {
        const dataService = new DataService(reqConfig.url)
          .setHeader(reqConfig.headers)
          .setMethod(reqConfig.method)
          .setParams(reqConfig.params);
        const response: AxiosResponse<U> = await dataService.createRequest(reqConfig.body);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: response });
        }
      } catch (error) {
        if (!didCancel) {
          const errorState = errorHandler(error);
          dispatch({ type: 'FETCH_FAILURE', payload: errorState });
        }
      }
    };

    if (reqConfig && reqConfig.url) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [reqConfig]);

  const performRequest = useCallback(<T = any>(config: IRequestConfig<T>) => {
    setReqConfig(config);
  }, []);

  return { performRequest, state, config: reqConfig };
}
