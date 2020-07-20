import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { Spinner } from 'lib/components/Spinner';
import { IErrorState } from 'typings';
import { useCampaign } from '../Campaign';
import { IAuth1Params, IAuthContext } from './types';
import { authReducer, initAuthState } from './auth.reducer';
import { auth1SignIn, auth2SignIn, getAuthStatus } from './auth.actions';

export const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initAuthState);
  const campaign = useCampaign();

  const handleAuth1SignIn = useCallback((auth1Params: IAuth1Params) => {
    auth1SignIn({ dispatch, auth1Params });
  }, []);

  const handleUserComeback = useCallback(() => {
    auth1SignIn({ dispatch, auth1Params: undefined, isComeback: true });
  }, []);

  const handleAuth2SignIn = useCallback((code: string, phoneNumber: string) => {
    auth2SignIn(dispatch, code, phoneNumber);
  }, []);

  const handleSetAuthError = useCallback((error: IErrorState) => {
    dispatch({ type: 'ERROR', payload: error });
  }, []);

  useEffect(() => {
    getAuthStatus(dispatch, campaign);
    // const authFactor = await fetchAuthStatus();
    // createAuthFactorRouter(authFactor);
  }, [campaign]);

  const authContext = useMemo<IAuthContext>(
    () => ({
      handleAuth1SignIn,
      handleUserComeback,
      handleAuth2SignIn,
      handleSetAuthError,
      authStatus: authState.authStatus,
      error: authState.error,
    }),
    [
      authState.authStatus,
      authState.error,
      handleAuth1SignIn,
      handleAuth2SignIn,
      handleSetAuthError,
      handleUserComeback,
    ]
  );

  const isLoading = authState.authStatus === 'IDLE' || authState.authStatus === 'PENDING';
  // const providerContext = Environment.SESSION_STAGE ? devContext : authContext;

  return (
    <Fragment>
      {isLoading ? (
        <Spinner message="Проверка аутентификации..." withBackdrop />
      ) : (
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
      )}
    </Fragment>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
