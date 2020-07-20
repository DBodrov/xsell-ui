import React, { useEffect, useLayoutEffect, createContext, useContext, useMemo } from 'react';
import { Spinner } from 'lib/components/Spinner';
import { useCampaign } from 'utils/use-campaign';
import { useError } from '../Error';
import { useAuthClient } from './use-authClient';
import { IAuthContext } from './types';

export const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider({ children }: any) {
  const {
    data,
    getAuthStatus,
    initializeAuthSession,
    auth1SignIn,
    auth2SignIn,
    logoff,
    isIdle,
    isInitialize,
    isLoading,
  } = useAuthClient();
  const { errorState } = useError();
  const { campaignParams } = useCampaign();

  useLayoutEffect(() => {
    getAuthStatus();
  }, [getAuthStatus]);

  useEffect(() => {
    if (isInitialize) {
      initializeAuthSession(campaignParams);
    }
  }, [campaignParams, errorState?.status, initializeAuthSession, isInitialize, logoff]);

  const value = useMemo<IAuthContext>(
    () => ({
      authStatus: data?.status,
      clientSettings: data?.clientSettings,
      handleAuth1SignIn: auth1SignIn,
      handleAuth2SignIn: auth2SignIn,
    }),
    [data?.status, data?.clientSettings, auth1SignIn, auth2SignIn]
  );
  if (isIdle || isLoading || isInitialize) return <Spinner withBackdrop message="Аутентификация..." />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
