import React, { useCallback } from 'react';
import { useFetch } from './use-fetch';

export function useAnalytics() {
  const fetchClient = useFetch();

  const pageView = useCallback(() => {}, []);
}
