export type AuthStatus = 'INITIALIZE' | 'AUTH1_REQUIRED' | 'AUTH2_REQUIRED' | 'OK';

export interface IAuthContext {
  authStatus: 'INITIALIZE' | 'AUTH1_REQUIRED' | 'AUTH2_REQUIRED' | 'OK';
  clientSettings?: { landingCode?: string };
  // error: { code: string | number; message: string };
  // isError: boolean;
  handleAuth1SignIn: (auth1Params?: IAuth1Params, isComeback?: boolean, isClient?: boolean) => void;
  handleAuth2SignIn: (code?: string) => void;
}

export type AuthState = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data?: { status: AuthStatus; clientSettings?: Record<string, unknown> };
  error?: any;
};

export interface IAuth1Params {
  birthDate: string;
  phoneNumber: string;
  distanceAgreement: boolean;
  consentAgree: boolean;
}
