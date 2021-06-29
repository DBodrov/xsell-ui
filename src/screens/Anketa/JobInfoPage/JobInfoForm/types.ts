export type TFormState = {
  readonly values: {
    workPlace?: string;
    workIndustry?: string;
    workInn?: string;
    lastWorkExperienceMonths?: string;
    mainMonthlyIncomeAmount?: string;
    creditBureauConsentAgree?: boolean;
    personalDataProcessingConsentAgree?: boolean;
    notarialRecord?: boolean;
    additionalPhone?: string;
  };
  readonly error: typeof initErrorState;
  readonly touched: typeof initTouchedState;
};

export const initTouchedState = {
  workPlace: false,
  workIndustry: false,
  workInn: false,
  lastWorkExperienceMonths: false,
  mainMonthlyIncomeAmount: false,
  additionalPhone: false,
};

export const initErrorState = {
  workPlace: '',
  workIndustry: '',
  workInn: '',
  lastWorkExperienceMonths: '',
  mainMonthlyIncomeAmount: '',
  creditBureauConsentAgree: '',
  personalDataProcessingConsentAgree: '',
  notarialRecord: '',
  additionalPhone: '',
};

export const initState: TFormState = {
  values: {
    workPlace: '',
    workIndustry: undefined,
    workInn: '',
    lastWorkExperienceMonths: '',
    mainMonthlyIncomeAmount: '',
    creditBureauConsentAgree: false,
    notarialRecord: false,
    personalDataProcessingConsentAgree: false,
    additionalPhone: '',
  },
  touched: initTouchedState,
  error: initErrorState,
};

export type TChangesType =
  | 'INIT_FORM'
  | 'RESET_FORM'
  | 'CHANGE_VALUE'
  | 'MULTI_CHANGES'
  | 'CLEAR_FIELD'
  | 'ADD_ERROR'
  | 'SET_ISVALIDATING'
  | 'SET_ISTOUCHED'
  | 'SET_ISVALID'
  | 'SET_ISSUBMITING'
  | 'SET_ISSUBMITED';


export type TFieldName = keyof TFormState['values'];

export interface IFormChanges {
  type: TChangesType;
  fieldName?: TFieldName;
  payload?: any;
}
