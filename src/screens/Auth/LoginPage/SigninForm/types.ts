import {IAuth1Params} from 'context/Auth';

export type TSigninFormProps = {
  onLogin: (authData: IAuth1Params) => void;
};

export type TFormState = {
  readonly values: {
    phoneNumber: string;
    birthDate: string;
    consentAgree: boolean;
    distanceAgreement: boolean;
  };
  readonly touched: {
    phoneNumber: boolean;
    birthDate: boolean;
    consentAgree: boolean;
    distanceAgreement: boolean;
  };
  readonly error: {
    phoneNumber: string;
    birthDate: string;
    consentAgree: string;
    distanceAgreement: string;
  };
};

export type TChangesType =
  | 'INIT_FORM'
  | 'RESET_FORM'
  | 'CHANGE_VALUE'
  | 'CLEAR_FIELD'
  | 'ADD_ERROR'
  | 'SET_ISVALIDATING'
  | 'SET_ISTOUCHED'
  | 'SET_ISVALID'
  | 'SET_ISSUBMITING'
  | 'SET_ISSUBMITED';

export interface IFormChanges {
  type: TChangesType;
  fieldName?: string;
  payload?: any;
}
