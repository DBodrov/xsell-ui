import React from 'react';
import { SuggestProps } from '../../types';
import css from './Suggest.module.scss';

export function Suggest(props: SuggestProps) {
    const { bic, bankName, bankRegion, searchQuery, onClick } = props;

    const handleSelectSuggest = () => {
        onClick?.(bic);
    };

    const displayBic = () => {
        const unmatchedBicPart = bic?.split(searchQuery);
        if (unmatchedBicPart.length > 1) {
            return (
                <span>
                    <strong>{searchQuery}</strong>
                    {unmatchedBicPart[1]}
                </span>
            );
        }
        return <span>{bic}</span>;
    };

    return (
        <div className={css.Suggest} onClick={handleSelectSuggest}>
            {displayBic()}
            <span className={css.Bank}>
                {bankName}, {bankRegion}
            </span>
        </div>
    );
}
