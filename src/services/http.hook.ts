import { useReducer, useEffect, useState, useMemo, useCallback } from 'react';
import { Method } from 'axios';
import { DataService } from './data.service';

interface IDataFetchState {
  isFetching: boolean;
  hasError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  data: any;
}

interface IActions {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
  payload?: any;
}

interface IRequestConfig<T> {
  url: string;
  method?: Method;
  headers?: IKeyValue;
  params?: IKeyValue;
  body?: T extends IKeyValue ? T : IKeyValue;
}

const initialDataState: IDataFetchState = {
  isFetching: false,
  hasError: false,
  isSuccess: false,
  errorMessage: '',
  data: undefined,
} as const;

const dataFetchReducer = (state = initialDataState, action: IActions) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        hasError: false,
        errorMessage: '',
        data: undefined,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        hasError: false,
        errorMessage: '',
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        hasError: true,
        errorMessage: action.payload as string,
        data: undefined,
      };
    default:
      throw new Error('Action not found');
  }
};

export function useDataApi() {
  const [url, setUrl] = useState<string>(null);
  const [method, setMethod] = useState<Method>('POST');
  const [headers, setHeaders] = useState<IKeyValue>({});
  const [params, setParams] = useState<IKeyValue>({});
  const [body, setBody] = useState<IKeyValue>({});

  const [state, dispatch] = useReducer(dataFetchReducer, initialDataState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({
        type: 'FETCH_INIT',
      });

      try {
        const dataService = new DataService(url).setHeader(headers).setMethod(method).setParams(params);
        const response = await dataService.createRequest(body);
        console.info({ response });

        if (response.status === 409) {
          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.errors });
          }
        }

        if (response.status !== 200 && response.status !== 409) {
          throw new Error('Что то пошло не так');
        }

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        }
      } catch (error) {
        if (!didCancel) {
          console.error({ error });
          if (error.response && error.response.status === 409) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.response.data.code });
          } else {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
          }
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [body, headers, method, params, url]);

  const performRequest = useCallback(<T>(config: IRequestConfig<T>) => {
    setUrl(config.url);
    setMethod(config.method);
    setParams((p) => ({ ...p, ...config.params }));
    setBody((b) => ({ ...b, ...config.body }));
    setHeaders((h) => ({ ...h, ...config.headers }));
  }, []);
  const config = useMemo(
    () => ({
      url,
      headers,
      params,
      body,
    }),
    [body, headers, params, url]
  );

  return { performRequest, state, config };
}
