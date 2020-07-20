import React, { createContext, useMemo, useContext, useReducer, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'lib/components/Spinner';
import { isEmptyString } from 'utils/string.utils';
import { createCampaignParams } from './utils';
import { ICampaignContext, CampaignParams, CampaignState } from './types';

export const CampaignContext = createContext<ICampaignContext>(undefined);

const initialCampaignState: CampaignState = { status: 'idle', data: null, error: null };
const campaignReducer = (state: CampaignState, action: CampaignState): CampaignState => ({
  ...state,
  ...action,
});

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const { search } = useLocation();

  const [{ status, data }, setState] = useReducer(campaignReducer, initialCampaignState);

  const setCampaignData = useCallback((params: CampaignParams) => {
    const isClient = params?.campaignContent?.length > 40;
    const hasCampaign = Object.keys(params).length > 0;
    setState({ status: 'success', data: { campaignParams: params, isClient, hasCampaign } });
  }, []);

  useEffect(() => {
    setState({ status: 'loading' });
    if (!data) {
      if (!isEmptyString(search)) {
        localStorage.setItem('query', search);
        const params = createCampaignParams(search);
        return setCampaignData(params);
      } else if (isEmptyString(search)) {
        const query = localStorage.getItem('query');
        if (query) {
          const params = createCampaignParams(query);
          return setCampaignData(params);
        } else {
          return setCampaignData({});
        }
      }
    }
    setState({ status: 'success' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const campaignContext = {
    campaignId: data?.campaignParams?.campaignName ?? '',
    ...data,
  };

  const campaignCtx = useMemo<ICampaignContext>(() => campaignContext, [campaignContext]);

  if (status === 'idle' || status === 'loading') {
    return <Spinner message="Загрузка..." withBackdrop />;
  }

  if (status === 'success' || status === 'error') {
    return <CampaignContext.Provider value={campaignCtx}>{children}</CampaignContext.Provider>;
  }
}

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
