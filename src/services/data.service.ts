/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import axios, { Method, AxiosPromise } from 'axios';

interface IHeaders {
  [key: string]: any;
}

export class DataService {
  private _headers: IHeaders;

  private _method: Method;

  private _params: Record<string, any>;

  constructor(private url: string) {
    return this;
  }

  public setHeader(headers: IHeaders = {}): DataService {
    this._headers = { ...headers };
    return this;
  }

  public setMethod(method: Method = 'POST'): DataService {
    this._method = method;
    return this;
  }

  public setParams(params: Record<string, any> = {}): DataService {
    this._params = { ...params };
    return this;
  }

  get headers() {
    return this._headers;
  }

  public createRequest<T = any>(body?: any): AxiosPromise<T> {
    return axios({
      url: this.url,
      headers: this._headers,
      method: this._method,
      params: this._params,
      data: body,
    });
  }
}
