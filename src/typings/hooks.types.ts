import { IDataFetchState } from './services';
import { ISession } from './session.types';

export interface IPageHook<T> {
  submitForm: (formData: T) => void;
  pageState: IDataFetchState<Partial<ISession>>;
}
