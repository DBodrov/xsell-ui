import { IErrorState } from 'typings';

export interface IAuthState {
  error: IErrorState;
  authStatus: AuthStatus;
  userProfile: Record<string, unknown>;
}

export type TAuthStatusFromBE = 'AUTH1_REQUIRED' | 'AUTH2_REQUIRED' | 'OK';

export enum AuthStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  INIT_REQUIRED = 'INIT_REQUIRED',
  SESSION_CREATED = 'SESSION_CREATED',
  AUTH_REJECTED = 'AUTH_REJECTED',
  AUTH_RESOLVED = 'AUTH_RESOLVED',
  USER_ISBACK = 'USER_ISBACK',
  PHONE_CONFIRM = 'PHONE_CONFIRM',
  PHONE_RECONFIRM = 'PHONE_RECONFIRM',
}

export type AuthActionTypes = 'STARTED' | 'ERROR' | 'SUCCESS';

export interface IAuthActions {
  type: AuthActionTypes;
  payload?: IAuthActionData | IErrorState;
}
export interface IAuthContext {
  authStatus: AuthStatus;
  handleAuth1SignIn: (args: IAuth1Params) => void;
  handleUserComeback: () => void;
  handleAuth2SignIn: (code: string, phoneNumber: string) => void;
  handleSetAuthError: (errorState: IErrorState) => void;
  error?: IErrorState;
}

export interface IAuth1Params {
  birthDate: string;
  phoneNumber: string;
  distanceAgreement: boolean;
  consentAgree: boolean;
}

export interface IAuth2Params {
  phoneNumber: string;
  verificationCode: boolean;
}

export interface IAuthResponse {
  verified: boolean;
  sessionStatus: TAuthStatusFromBE;
}
