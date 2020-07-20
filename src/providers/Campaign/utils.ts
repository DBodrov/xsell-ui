import { CampaignParams } from './types';

const utmMap = {
  utm_campaign: 'campaignName',
  utm_term: 'campaignDate',
  utm_medium: 'campaignMedium',
  utm_content: 'campaignContent',
  utm_source: 'campaignSource',
  camp_source: 'clientSource',
} as const;

export const createCampaignParams = (queryString: string): CampaignParams => {
  const campainParams: CampaignParams = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((value: string, tag: string) => {
      const key = tag && utmMap[tag] ? utmMap[tag] : tag;
      campainParams[key] = value;
    });
  }
  return campainParams;
};
