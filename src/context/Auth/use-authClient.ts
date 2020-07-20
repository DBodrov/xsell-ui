import { useReducer, useCallback } from 'react';
import { useFetch } from 'utils/use-fetch';
import { Cookies } from 'utils/cookies';
import { useError } from '../Error';
import { AuthState, IAuth1Params } from './types';

const initialState: AuthState = { status: 'idle', data: { status: null, clientSettings: null }, error: null };

export function useAuthClient() {
  const fetchClient = useFetch();
  const { setErrorState } = useError();
  const [{ status, data }, setState] = useReducer(
    (s: AuthState, a: AuthState) => ({ ...s, ...a }),
    initialState
  );
  const getAuthStatus = useCallback(() => {
    setState({ status: 'pending' });
    fetchClient('/gateway/auth-status', { body: {} }).then(
      (data) => {
        setState({ status: 'resolved', data });
        return data;
      },
      (error) => {
        setState({ status: 'rejected' });
        setErrorState(error);
        return error;
      }
    );
  }, [fetchClient, setErrorState]);

  const initializeAuthSession = useCallback(
    (initParams: Record<string, unknown> = {}) => {
      setState({ status: 'pending' });
      fetchClient('/gateway/initialize', { body: initParams }).then(
        (data) => {
          const { sessionStatus, settings } = data;
          setState({
            status: 'resolved',
            data: { status: sessionStatus, clientSettings: settings },
          });
          return data;
        },
        (error) => {
          setState({ status: 'rejected' });
          setErrorState(error);
          return error;
        }
      );
    },
    [fetchClient, setErrorState]
  );

  const auth1SignIn = useCallback(
    (auth1Data: IAuth1Params, isComeback = false, isClient = false) => {
      setState({ status: 'pending' });
      const fetchConfig = isComeback
        ? { url: '/gateway/auth1-retry', body: {} }
        : isClient
        ? { url: '/gateway/auth1-utm', body: {} }
        : { url: '/gateway/auth1', body: auth1Data };
      fetchClient(fetchConfig.url, { body: fetchConfig.body }).then(
        (data) => {
          const { sessionStatus, verified } = data;
          if (verified) {
            !isComeback && Cookies.setCookie('_dcash_tel', auth1Data?.phoneNumber);
            setState({
              status: 'resolved',
              data: { status: sessionStatus },
            });
          } else {
            setState({ status: 'rejected' });
            setErrorState({ status: 404, message: 'User not found', code: 'USER_NOT_FOUND' });
          }
          return data;
        },
        (error) => {
          setState({ status: 'rejected' });
          setErrorState(error);
          return error;
        }
      );
    },
    [fetchClient, setErrorState]
  );

  const auth2SignIn = useCallback(
    (verificationCode: string) => {
      setState({ status: 'pending' });
      setErrorState(undefined);
      const phoneNumber = Cookies.getCookie(Cookies.PHONE_NUMBER);
      const isComeback = Cookies.getCookie(Cookies.USER_DATA).length > 0;
      const fetchConfig = isComeback
        ? { url: '/gateway/auth2-retry', body: { verificationCode } }
        : { url: '/gateway/auth2', body: { phoneNumber, verificationCode } };
      fetchClient(fetchConfig.url, { body: fetchConfig.body }).then(
        (data) => {
          const { sessionStatus, verified } = data;
          if (verified) {
            setState({
              status: 'resolved',
              data: { status: sessionStatus },
            });
          } else {
            setState({ status: 'rejected' });
            setErrorState({
              status: 400,
              message: 'Неверный код. Чтобы продолжить оформление кредита введите корректный код из СМС',
            });
          }
          return data;
        },
        (error) => {
          setState({ status: 'rejected' });
          setErrorState(error);
          return error;
        }
      );
    },
    [fetchClient, setErrorState]
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
    data,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isInitialize: data?.status === 'INITIALIZE',
    isSuccess: status === 'resolved' && data?.status !== 'INITIALIZE',
  };
}
