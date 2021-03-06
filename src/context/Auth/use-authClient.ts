import {useReducer, useCallback} from 'react';
import {useFetch} from 'utils/use-fetch';
import {Cookies} from 'utils/cookies';
import {userEvents} from 'utils/use-page-view';
import {useError} from '../Error';
import {AuthState, IAuth1Params} from './types';

const initialState: AuthState = {
  status: 'idle',
  authStatus: undefined,
  landingCode: undefined,
  phone: undefined,
  phoneVerified: false,
  error: null,
};

const authReducer = (state: AuthState, changes: AuthState): AuthState => {
  const newState = {...state, ...changes};
  return newState;
};

export function useAuthClient() {
  const fetchClient = useFetch();
  const {setErrorState} = useError();
  const [{status, authStatus, landingCode, phoneVerified, error}, setState] = useReducer(authReducer, initialState);

  const getAuthStatus = useCallback(() => {
    setState({status: 'pending'});
    fetchClient('/gateway/auth-status', {body: {}}).then(
      response => {
        setState({status: 'resolved', authStatus: response.status});
        return response;
      },
      error => {
        setState({status: 'rejected', error});
        setErrorState(error);
        return error;
      },
    );
  }, [fetchClient, setErrorState]);

  const initializeAuthSession = useCallback(
    (initParams: Record<string, unknown> = {}) => {
      setState({status: 'pending'});
      fetchClient('/gateway/initialize', {body: initParams}).then(
        response => {
          const {sessionStatus, settings} = response;
          setState({
            status: 'resolved',
            authStatus: sessionStatus,
            landingCode: settings?.landingCode,
          });
          return response;
        },
        error => {
          setState({status: 'rejected', error});
          setErrorState(error);
          return error;
        },
      );
    },
    [fetchClient, setErrorState],
  );

  const auth1SignIn = useCallback(
    (auth1Data: IAuth1Params, isComeback = false, isClient = false) => {
      setState({status: 'pending', error: null});
      if (auth1Data) {
        auth1Data.phoneNumber = `7${auth1Data.phoneNumber}`;
      }
      const fetchConfig = isComeback
        ? {url: '/gateway/auth1-retry', body: {}}
        : isClient
        ? {url: '/gateway/auth1-utm', body: {}}
        : {url: '/gateway/auth1', body: auth1Data};

      fetchClient(fetchConfig.url, {body: fetchConfig.body}).then(
        response => {
          const {sessionStatus, verified, phone} = response;

          if (verified) {
            const storedPhone = auth1Data?.phoneNumber ?? phone;
            !isComeback && Cookies.setCookie('_dcash_tel', storedPhone);
            userEvents({category: 'AUTH', action: 'AUTH1_OK'});
            setState({
              status: 'resolved',
              authStatus: sessionStatus,
              phone,
            });
          } else {
            const error = {status: 404, message: 'User not found', code: 'USER_NOT_FOUND'};
            setState({status: 'rejected', error});
            setErrorState(error);
            userEvents({category: 'AUTH', action: 'AUTH1_FAIL_NOT_FOUND'});
          }
          return response;
        },
        error => {
          setState({status: 'rejected', error});
          userEvents({category: 'AUTH', action: 'AUTH1_FAIL'});
          setErrorState(error);

          return error;
        },
      );
    },
    [fetchClient, setErrorState],
  );

  const auth2SignIn = useCallback(
    (verificationCode: string) => {
      setState({status: 'pending', error: null});
      setErrorState(undefined);
      const phoneNumber = Cookies.getCookie(Cookies.PHONE_NUMBER);
      const isComeback = Cookies.getCookie(Cookies.USER_DATA).length > 0;
      const fetchConfig = isComeback
        ? {url: '/gateway/auth2-retry', body: {verificationCode}}
        : {url: '/gateway/auth2', body: {phoneNumber, verificationCode}};
      fetchClient(fetchConfig.url, {body: fetchConfig.body}).then(
        data => {
          const {sessionStatus, verified} = data;
          if (verified) {
            userEvents({category: 'AUTH', action: 'AUTH2_OK'});
            setState({
              status: 'resolved',
              authStatus: sessionStatus,
              phoneVerified: true,
            });
          } else {
            const error = {
              status: 400,
              message: '???????????????? ??????. ?????????? ???????????????????? ???????????????????? ?????????????? ?????????????? ???????????????????? ?????? ???? ??????',
            };
            setState({status: 'rejected', error});
            userEvents({category: 'AUTH', action: 'AUTH2_FAIL'});
            setErrorState(error);
          }
          return data;
        },
        error => {
          setState({status: 'rejected', error});
          userEvents({category: 'AUTH', action: 'AUTH2_FAIL'});
          setErrorState(error);
          return error;
        },
      );
    },
    [fetchClient, setErrorState],
  );

  const logoff = useCallback(() => {
    getAuthStatus();
  }, [getAuthStatus]);

  return {
    getAuthStatus,
    initializeAuthSession,
    auth1SignIn,
    auth2SignIn,
    logoff,
    authStatus,
    landingCode,
    phoneVerified,
    error,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isInitialize: authStatus === 'INITIALIZE',
    isSuccess: status === 'resolved' && authStatus !== 'INITIALIZE',
  };
}
