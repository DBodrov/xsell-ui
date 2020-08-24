import React, {useMemo} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthContext, IAuthContext} from 'context/Auth';
import {AnketaContext, TAnketaContext} from 'context/Anketa';
import {ErrorContext, IErrorContext} from 'context/Error';

const fn = (args?: any) => console.info(args ?? 'invoke');

export const mockAuthContext: IAuthContext = {
  authStatus: 'OK',
  handleAuth1SignIn: fn,
  handleAuth2SignIn: fn,
  clientSettings: {},
};

export const mockAnketaContext: TAnketaContext = {
  archivingAnketa: fn,
  fetchCustomerCards: fn,
  refusePhotoPassport: fn,
  updateAnketa: fn,
  verifySignature: fn,
  anketa: {},
  step: 'REJECTED',
};

const mockErrorContext: IErrorContext = {
  setErrorState: fn,
  errorState: {status: null, code: null, message: null},
};

interface IAllProvidersProps {
  children: React.ReactNode;
  authContext?: Partial<IAuthContext>;
  anketaContext?: Partial<TAnketaContext>;
  errorContext?: IErrorContext;
}

export const AllProviders = ({children, authContext, anketaContext, errorContext}: IAllProvidersProps) => {
  const history = createMemoryHistory();
  const anketaCtx = useMemo(() => ({...mockAnketaContext, ...anketaContext}), [anketaContext]);
  const authCtx = useMemo(() => ({...mockAuthContext, ...authContext}), [authContext]);
  const errorCtx = useMemo(() => ({...mockErrorContext, ...errorContext}), [errorContext]);

  return (
    <Router history={history}>
      <ErrorContext.Provider value={errorCtx}>
        <AuthContext.Provider value={authCtx}>
          <AnketaContext.Provider value={anketaCtx}>{children}</AnketaContext.Provider>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </Router>
  );
};

type ProvidersProps = {
  authContext?: Partial<IAuthContext>;
  anketaContext?: Partial<TAnketaContext>;
};

export const providersRender = (
  children: React.ReactElement,
  providersProps?: ProvidersProps,
  options?: RenderOptions,
) => render(<AllProviders {...providersProps}>{children}</AllProviders>, {...options});

export * from '@testing-library/react';

export {providersRender as render, userEvent, render as rtlRender};
