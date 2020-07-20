import React from 'react';
import { Suggest } from './Suggest';
import { SuggestionListProps } from '../types';
import css from './SuggestionList.module.scss';

export function SuggestionList(props: SuggestionListProps) {
    const { results, query, onSelectSuggest } = props;
    return (
        <div className={css.SuggestionList}>
            {results?.length > 0 ? (
                results.map(({ bankName, bic, bankRegion }) => (
                    <Suggest
                        key={bic}
                        searchQuery={query}
                        bic={bic}
                        bankName={bankName}
                        bankRegion={bankRegion}
                        onClick={onSelectSuggest}
                    />
                ))
            ) : (
                <span className={css.NoData}>БИК не найден</span>
            )}
        </div>
    );
}
