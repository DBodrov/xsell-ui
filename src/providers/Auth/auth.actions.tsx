import { DataService, auditService } from 'services';
import { ICampaignContext } from 'providers';
import { errorHandler } from 'hooks';
import { IAuthActions, IAuth1Params, IAuthResponse, AuthStatus } from './types';
import { prepareAuth1Args, hasUserData, clientIsComeback, logoff, getStoredPhone } from './utils';

const createSession = async (dispatch: React.Dispatch<IAuthActions>, campain: ICampaignContext) => {
  try {
    const {
      data: { settings = {} },
    } = await new DataService('/gateway/initialize').setMethod('POST').createRequest(campain?.campaignParams);
    const status: AuthStatus = hasUserData() ? AuthStatus.USER_ISBACK : AuthStatus.SESSION_CREATED;
    dispatch({ type: 'SUCCESS', payload: { status, profile: { ...settings } } }); // FIXME: non single responsibility
  } catch (error) {
    const errorState = errorHandler(error);
    dispatch({ type: 'ERROR', payload: errorState });
  }
};

export const getAuthStatus = async (dispatch: React.Dispatch<IAuthActions>, campain: ICampaignContext) => {
  dispatch({ type: 'STARTED' });
  const storedPhone = getStoredPhone();
  /** Check for BUG xsel-1463 */
  if (storedPhone === 'undefined' || !storedPhone) {
    logoff();
  }
  try {
    const {
      data: { status: authStatus },
    } = await new DataService('/gateway/auth-status').setMethod('POST').createRequest();

    switch (authStatus) {
      case 'AUTH1_REQUIRED': {
        const status: AuthStatus = clientIsComeback() ? AuthStatus.USER_ISBACK : AuthStatus.SESSION_CREATED;
        return dispatch({ type: 'SUCCESS', payload: { status } });
      }
      case 'AUTH2_REQUIRED': {
        const status: AuthStatus = clientIsComeback() ? AuthStatus.PHONE_RECONFIRM : AuthStatus.PHONE_CONFIRM;
        return dispatch({ type: 'SUCCESS', payload: { status } });
      }
      case 'OK': {
        return dispatch({ type: 'SUCCESS', payload: { status: AuthStatus.AUTH_RESOLVED } });
      }
      default:
      case 'INITIALIZE': {
        return createSession(dispatch, campain);
      }
    }
  } catch (error) {
    const errorState = errorHandler(error);
    dispatch({ type: 'ERROR', payload: errorState });
  }
};

interface IAuth1SignInArgs {
  dispatch: React.Dispatch<IAuthActions>;
  auth1Params: IAuth1Params;
  isComeback?: boolean;
}

export const auth1SignIn = async ({ dispatch, auth1Params, isComeback = false }: IAuth1SignInArgs) => {
  dispatch({ type: 'STARTED' });
  try {
    const auth1Args: IAuth1Params = isComeback ? undefined : prepareAuth1Args(auth1Params);
    const url = isComeback ? '/gateway/auth1-retry' : '/gateway/auth1';
    const { data } = await new DataService(url).setMethod('POST').createRequest<IAuthResponse>(auth1Args);
    auth1Handler(dispatch, data, auth1Args?.phoneNumber);
  } catch (error) {
    const errorState = errorHandler(error);
    dispatch({ type: 'ERROR', payload: errorState });
    auditService.userEvent({ category: 'AUTH', action: 'AUTH1_FAIL' });
  }
};

const auth1Handler = (dispatch: React.Dispatch<IAuthActions>, data: IAuthResponse, phoneNumber: string) => {
  const { verified } = data;

  if (verified) {
    const status = clientIsComeback ? AuthStatus.PHONE_RECONFIRM : AuthStatus.PHONE_CONFIRM;
    if (status === AuthStatus.PHONE_CONFIRM) {
      localStorage.setItem('tel', phoneNumber);
    }
    dispatch({ type: 'SUCCESS', payload: { status } });
    auditService.userEvent({ category: 'AUTH', action: 'AUTH1_OK' });
  } else {
    dispatch({
      type: 'ERROR',
      payload: { errorMessage: 'CLIENT NOT FOUND', errorNumber: 409 },
    });
    auditService.userEvent({ category: 'AUTH', action: 'AUTH1_FAIL' });
  }
};

export const auth2SignIn = async (
  dispatch: React.Dispatch<IAuthActions>,
  code: string,
  phoneNumber: string
) => {
  dispatch({ type: 'STARTED' });
  try {
    const { data } = await new DataService('/gateway/auth2').setMethod('POST').createRequest<IAuthResponse>({
      phoneNumber,
      verificationCode: code,
    });

    auth2Handler(dispatch, data);
  } catch (error) {
    const errorState = errorHandler(error);
    dispatch({ type: 'ERROR', payload: errorState });
    auditService.userEvent({ category: 'AUTH', action: 'AUTH2_FAIL' });
  }
};

const auth2Handler = (dispatch: React.Dispatch<IAuthActions>, data: IAuthResponse) => {
  const { verified } = data;

  if (verified) {
    dispatch({ type: 'SUCCESS', payload: { status: AuthStatus.AUTH_RESOLVED } });
    localStorage.setItem('phoneIsVerified', '1');
    auditService.userEvent({ category: 'AUTH', action: 'AUTH2_OK' });
  } else {
    dispatch({
      type: 'ERROR',
      payload: {
        errorMessage: 'Неверный код. Чтобы продолжить оформление кредита введите корректный код из СМС',
        errorNumber: 401,
      },
    });
    auditService.userEvent({ category: 'AUTH', action: 'AUTH2_FAIL' });
  }
};
