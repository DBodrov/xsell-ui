/* eslint-disable @typescript-eslint/no-empty-function */
import { IAuthContext } from './types';

export const devContext: IAuthContext = {
  isAuth: true,
  isReEntry: false,
  sessionOk: true,
  auth1Ok: true,
  auth2Ok: true,
  landingCode: null,
  authStatus: 'OK',
  handleAuth1SignIn: () => {},
  handleAuth1ReEntry: () => {},
  handleAuth2SignIn: () => {},
  handleAuth2ReEntry: () => {},
  auth1Params: {
    birthDate: '11.11.1991',
    phoneNumber: '+79993334455',
    distanceAgreement: true,
    consentAgree: true,
  },
  hasError: false,
};
