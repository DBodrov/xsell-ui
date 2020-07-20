import { useState, useEffect, useCallback } from 'react';
import { DataService } from 'services';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<[any]>(null);
    const [status, setStatus] = useState('not found');

    const startSearch = useCallback((searchQuery: string) => {
        setQuery(searchQuery);
    }, []);

    useEffect(() => {
        const fetchBICSuggest = async () => {
            const DADATA_BIC_URL = '/gateway/dadata/suggestions/api/4_1/rs/suggest/bank';
            const searchResults = await new DataService(DADATA_BIC_URL)
                .setMethod('POST')
                .createRequest({ query });
            setResults(searchResults.data.suggestions);
        };

        if (query.length >= 3) {
            fetchBICSuggest();
        } else {
            setResults(null);
        }
    }, [query]);

    useEffect(() => {
        const foundedBic = results?.findIndex(result => result?.data?.bic === query);
        if (query.length === 9 && foundedBic === 0) {
            setStatus('founded');
        } else {
            setStatus('not found');
        }
    }, [query, results]);

    return { startSearch, query, setQuery, results, status } as const;
}
