import React, {createContext, useState, useMemo, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ClientNotFound} from 'screens/Auth/ClientNotFound';
import {ErrorPage} from 'screens/ErrorPage';

export type ErrorState = {
  status: number | string;
  message?: string;
  code?: string;
};

export interface IErrorContext<T = Record<string, unknown>> {
  setErrorState: (error?: ErrorState) => void;
  errorState?: T extends ErrorState ? T : ErrorState;
}

export const ErrorContext = createContext<IErrorContext>(undefined);

//TODO: взять ErrorBoundary (use-error-boundary) или сделать что то получше чем сейчас
const notFoundResponse = (error: ErrorState) =>
  (error?.status === 404 && error?.code === 'USER_NOT_FOUND') ||
  (error?.status === 409 && error?.code === 'CUSTOMER_PROFILE_NOT_FOUND');

export function ErrorProvider({children}: any) {
  const [errorState, setErrorState] = useState<ErrorState>(undefined);
  const history = useHistory();

  const contextValue = useMemo<IErrorContext>(() => ({setErrorState, errorState}), [errorState]);

  const renderContent = () => {
    if (notFoundResponse(errorState)) {
      return <ClientNotFound />;
    }
    if (errorState?.status >= 500) {
      return <ErrorPage />;
    }
    return children;
  };

  useEffect(() => {
    if (errorState?.status === 409 && errorState?.code === 'SESSION_EXPIRED') {
      window.location.assign(window.location.pathname);
    }
    if (errorState?.status === 401) {
      window.location.assign(window.location.pathname);
    }
  }, [errorState, history]);

  return <ErrorContext.Provider value={contextValue}>{renderContent()}</ErrorContext.Provider>;
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within a ErrorProvider');
  }
  return context;
};
