import React, { useRef, useEffect } from 'react';
import cN from 'classnames/bind';
import { isEmptyString, onlyDigit, maxLengthString } from 'utils/string.utils';
import { Dropdown, useDropdown } from '../../Dropdown2';
import { SuggestionList } from './SuggestionList';
import { useSearch } from './search.hook';
import { IBicSearchProps, BicBankSuggestion, FoundedValue } from './types';
import css from './BicSearch.module.scss';

const cx = cN.bind(css);

export function BicSearch(props: IBicSearchProps) {
    const { hasError, value, onChangeHandler, onBlurHandler, ...other } = props;
    const searchRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const { isOpen, parentRect, setIsOpen } = useDropdown(searchRef, suggestionsRef);
    const { query, setQuery, startSearch, results, status } = useSearch();

    const cssClasses: string = cx({ [css.hasError]: hasError });

    const displayValue = isEmptyString(value) ? query : value;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = onlyDigit(event.currentTarget.value);
        const searchQuery = maxLengthString(value, 9);

        startSearch(searchQuery);
        setIsOpen(searchQuery.length >= 3);
        const bicValue: FoundedValue = { bic: searchQuery, isFound: false };
        onChangeHandler(bicValue);
    };

    const handleFocus = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (query.length >= 3) {
            setIsOpen(true);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const relatedTarget = event.relatedTarget as Node;
        if (relatedTarget !== null && relatedTarget.contains(suggestionsRef.current)) {
            return;
        }
        onBlurHandler({ bic: value, isFound: false }, event);
    };

    const handleSelectSuggest = (value: string) => {
        onChangeHandler({ bic: value, isFound: true });
        setQuery(value);
        searchRef.current.focus();
        setIsOpen(false);
    };

    const bicResults: BicBankSuggestion[] = results?.map((result) => ({
        bic: result?.data?.bic,
        bankName: result?.value,
        bankRegion: result?.data?.address?.data?.region_with_type,
    }));

    useEffect(() => {
        if (query.length === 9 && status === 'founded') {
            onChangeHandler({ bic: query, isFound: true });
        }
    }, [onChangeHandler, query, status]);

    return (
        <div className={css.Wrapper}>
            <input
                className={cx(css.InputControl, cssClasses)}
                type="tel"
                value={displayValue}
                onChange={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleFocus}
                ref={searchRef}
                {...other}
            />
            <Dropdown isOpen={isOpen} parentBound={parentRect}>
                <div className={css.SearchResults} ref={suggestionsRef}>
                    <SuggestionList
                        query={query}
                        results={bicResults}
                        onSelectSuggest={handleSelectSuggest}
                    />
                </div>
            </Dropdown>
        </div>
    );
}
