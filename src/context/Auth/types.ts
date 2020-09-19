export type AuthStatus = 'INITIALIZE' | 'AUTH1_REQUIRED' | 'AUTH2_REQUIRED' | 'OK';
export type TLandingCode = 'LANDING_TEST_1' | 'LANDING_TEST_2' | 'LANDING_TEST_3' | 'LANDING_TEST_4';
export type TClientSettings = {
  landingCode?: TLandingCode;
}
export type TUser = {
  phone?: string;
}
export interface IAuthContext {
  authStatus: 'INITIALIZE' | 'AUTH1_REQUIRED' | 'AUTH2_REQUIRED' | 'OK';
  clientSettings?: TClientSettings;
  user?: TUser;
  error: Record<string, unknown>;
  // isError: boolean;
  handleAuth1SignIn: (auth1Params?: IAuth1Params, isComeback?: boolean, isClient?: boolean) => void;
  handleAuth2SignIn: (code?: string) => void;
}

export type AuthState = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  // authData?: { status: AuthStatus; clientSettings?: TClientSettings, user?: TUser};
  authStatus?: AuthStatus;
  phoneVerified?: boolean;
  landingCode?: TLandingCode;
  phone?: string;
  error?: any;
};

export interface IAuth1Params {
  birthDate: string;
  phoneNumber: string;
  distanceAgreement: boolean;
  consentAgree: boolean;
}
