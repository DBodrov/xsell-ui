import { useEffect, useState } from 'react';
// import {} from './utils';

export function useSearchQuery() {
  const [isFetching, setIsFetching] = useState(false);
  const [campaignParams /*, setCampaignParams*/] = useState({});
  const [query, setQuery] = useState('');

  const getCampaignParams = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (query) {
      setIsFetching(true);
    }
  }, [query]);

  return {
    isFetching,
    campaignParams,
    getCampaignParams,
  };
}
