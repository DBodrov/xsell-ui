/**DEPRICATED!!!
 * Use test-utils.ts from utils instead.
 */
import React, { useMemo } from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { BreakpointContext } from '../Breakpoint';
import { CampaignContext, ICampaignContext } from '../Campaign';
import { AuthContext } from '../Auth/AuthProvider';
import { IAuthContext, AuthStatus } from '../Auth/types';
import { AnketaContext, AnketaUpdatersContext } from './AnketaProvider';
import { IAnketaContext, IAnketaUpdatersContext, IAnketa } from './types';
import { routeMap } from 'pages/Anketa/anketa.routingMap';

const createMockUpdatersContext = (fn: (args?: any) => void): IAnketaUpdatersContext => ({
  handleDocumentsSigning: fn,
  handleDocumentsVerifySignature: fn,
  handleSignAgreement: fn,
  handleUpdateAnketa: fn,
  handleVerifySignature: fn,
  handleGetCustomerCards: fn,
  handleSendCustomerCard: fn,
  handleArchivingAnketa: fn,
});

export const mockAnketaContext: IAnketaContext = {
  isFetching: false,
  anketaStatus: 'LOAN_PARAMS',
  anketa: {} as Partial<IAnketa>,
  hasError: false,
  error: null,
};

export const mockAuthContext: IAuthContext = {
  authStatus: AuthStatus.IDLE,
  handleAuth1SignIn: console.info,
  handleAuth2SignIn: console.info,
  handleSetAuthError: console.info,
  handleUserComeback: console.info,
  error: {},
};

/* eslint-disable */
export const mockCampaignContext: ICampaignContext = {
  campaignParams: {},
  hasCampaign: false,
  saveCampaignParams: () => {},
  saveQueryString: () => {},
};
/* eslint-enable */

interface IMockProvidersProps {
  children: React.ReactNode;
  authContext: Partial<IAuthContext>;
  anketaContext: Partial<IAnketaContext>;
  updatersMock?: (args: any) => void;
}

export const MockAnketaProvider = ({
  children,
  authContext,
  anketaContext,
  updatersMock,
}: IMockProvidersProps) => {
  const anketaCtx = useMemo(() => ({ ...mockAnketaContext, ...anketaContext }), [anketaContext]);
  const authCtx = useMemo(() => ({ ...mockAuthContext, ...authContext }), [authContext]);
  const history = createMemoryHistory({
    initialEntries: [routeMap[anketaCtx.anketaStatus]],
  });

  return (
    <Router history={history}>
      <BreakpointContext.Provider value={{ lg: true, md: true, or: false, sm: false, xs: false }}>
        <AuthContext.Provider value={authCtx}>
          <AnketaContext.Provider value={anketaCtx}>
            <AnketaUpdatersContext.Provider value={createMockUpdatersContext(updatersMock)}>
              {children}
            </AnketaUpdatersContext.Provider>
          </AnketaContext.Provider>
        </AuthContext.Provider>
      </BreakpointContext.Provider>
    </Router>
  );
};

export const withAnketaProvider = (
  children: React.ReactNode,
  context?: Partial<IAnketaContext>,
  authContext?: Partial<IAuthContext>,
  updatersMock?: (args: any) => void
) =>
  render(
    <CampaignContext.Provider value={mockCampaignContext}>
      <MockAnketaProvider anketaContext={context} updatersMock={updatersMock} authContext={authContext}>
        {children}
      </MockAnketaProvider>
    </CampaignContext.Provider>
  );
