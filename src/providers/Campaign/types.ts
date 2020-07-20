export interface ICampaignState {
  isLoading: boolean;
  isSuccess: boolean;
  isCampaign: boolean;
  queryString: string;
  campaignParams: Partial<ICampaignParams>;
  campaign: any;
}

export interface ICampaignActions {
  type: CampaignActionTypes;
  payload?: any;
}

export type CampaignActionTypes = 'IS_LOADING' | 'CREATE_CAMPAIGN' | 'IS_FAILURE';

export interface ICampaignParams {
  campaignName: string;
  campaignDate: string;
  campaignMedium: string;
  campaignContent: string;
  campaignSource: string;
  clientSource: string;
}

export type CampaignParams = Partial<ICampaignParams>;

export interface ICampaignContext {
  campaignParams?: CampaignParams;
  campaignId?: string;
  hasCampaign: boolean;
  isClient: boolean;
}

export type CampaignState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: {
    campaignParams: CampaignParams;
    isClient: boolean;
    hasCampaign: boolean;
  };
  error?: Record<string, unknown>;
};
