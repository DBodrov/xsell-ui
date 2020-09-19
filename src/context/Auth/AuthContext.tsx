import React, {useEffect, useLayoutEffect, createContext, useContext, useMemo} from 'react';
import {Spinner} from 'lib/components/Spinner';
import {useCampaign} from 'utils/use-campaign';
import {useAuthClient} from './use-authClient';
import {IAuthContext} from './types';

export const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider({children}: any) {
  const {
    authStatus,
    landingCode,
    getAuthStatus,
    initializeAuthSession,
    auth1SignIn,
    auth2SignIn,
    logoff,
    isIdle,
    isInitialize,
    isLoading,
    error,
  } = useAuthClient();

  const {campaignParams} = useCampaign();

  useLayoutEffect(() => {
    getAuthStatus();
  }, [getAuthStatus]);

  useEffect(() => {
    if (isInitialize) {
      initializeAuthSession(campaignParams);
    }
  }, [campaignParams, initializeAuthSession, isInitialize, logoff]);

  const value = useMemo<IAuthContext>(
    () => ({
      authStatus,
      error,
      clientSettings: {landingCode},
      handleAuth1SignIn: auth1SignIn,
      handleAuth2SignIn: auth2SignIn,
    }),
    [authStatus, error, landingCode, auth1SignIn, auth2SignIn],
  );
  if (isIdle || isLoading || isInitialize) return <Spinner withBackdrop message="Загрузка..." />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
