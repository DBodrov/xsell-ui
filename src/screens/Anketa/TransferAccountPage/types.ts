export type TFormState = {
  readonly values: {
    accountNumber: string;
    bankIdCode: string;
    readonly searchResult: TBicSuggestion[];
  };
  readonly touched: {
    accountNumber: boolean;
    bankIdCode: boolean;
  };
  readonly error: {
    accountNumber: string;
    bankIdCode: string;
  };
};

export interface IFormChanges {
  type: 'ADD_ERROR' | 'CHANGE_VALUE' | 'ADD_FOUNDED';
  fieldName?: 'accountNumber' | 'bankIdCode' | 'searchResult';
  payload?: any;
}

export type TBicSuggestion = {
  bic: string;
  description?: string;
};
