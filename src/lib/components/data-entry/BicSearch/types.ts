export type FoundedValue = { bic: string; isFound: boolean };

export interface IBicSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    styles?: React.CSSProperties;
    name: string;
    value?: string;
    onFocusHandler?: (value: FoundedValue, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: FoundedValue, event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: FoundedValue, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export type BicBankSuggestion = {
    bic: string;
    bankName: string;
    bankRegion: string;
};

export type SuggestionListProps = {
    results: BicBankSuggestion[];
    query: string;
    onSelectSuggest: (value: string) => void;
};

export type SuggestProps = BicBankSuggestion & {
    searchQuery?: string;
    onClick: (value: string) => void;
};
