export type FoundedValue = {bic: string; isFound: boolean};

export interface IBicSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  styles?: React.CSSProperties;
  name: string;
  value?: string;
  onFocusHandler?: (value: FoundedValue, event?: React.FocusEvent<HTMLInputElement>) => void;
  onBlurHandler?: (value: FoundedValue, event?: React.FocusEvent<HTMLInputElement>) => void;
  onChangeHandler: (value: FoundedValue, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TBicBankSuggestion = {
  bic: string;
  description?: string;
};

export type TSuggestionListProps = {
  results: TBicBankSuggestion[];
  query: string;
  onSelectSuggest: (value: string) => void;
};

export type TSuggestProps = TBicBankSuggestion & {
  searchQuery?: string;
  onClick: (value: string) => void;
};

export type TBicSearchProps = {
  wasSubmitted: boolean;
  searchResults: TBicBankSuggestion[];
  onChange: (value: string) => void;
  value?: string;
  errorMessage?: string;
  touched: boolean;
  onTouch: () => void;
  onSelect: (value: string) => void;
};
