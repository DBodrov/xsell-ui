const timezone = new Date().getTimezoneOffset() / -60;

export type TLoanParams = typeof initLoanParams;

export const initLoanParams: TPaymentRequest = {
  customerTimezoneOffset: timezone,
  requestedLoanAmount: 0,
  requestedLoanTermMonths: 0,
  jobLossProtection: false,
  lifeAndHealthProtection: false,
  smsInforming: false,
  campaignParticipant: false,
  workExperience: undefined,
  campaign: null,
  productCode: null
};

export const initErrorState = {
  requestedLoanAmount: '',
  requestedLoanTermMonths: '',
};

export const initTouchedState = {
  requestedLoanAmount: false,
  requestedLoanTermMonths: false,
};

export const initFormState: TFormState = {
  values: initLoanParams,
  error: initErrorState,
  touched: initTouchedState,
};

export type TFormState = {
  readonly values: typeof initLoanParams;
  readonly error: typeof initErrorState;
  readonly touched: typeof initTouchedState;
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

export interface IFormChanges {
  type: TChangesType;
  fieldName?: string | string[];
  payload?: any;
}

export type TPaymentValues = {
  allCampaignPayment: number;
  allJobLossProtectionPayment: number;
  allLifeAndHealthProtectionPayment: number;
  allSmsPayment: number;
  monthlyCampaignPayment: number;
  monthlyJobLossProtectionPayment: number;
  monthlyLifeAndHealthProtectionPayment: number;
  monthlyPayment: number;
  monthlySmsPayment: number;
  rate: number;
};

export type TCalculatorParams = {
  minLoanAmount: number;
  maxLoanAmount: number;
  minLoanTermMonths: number;
  maxLoanTermMonths: number;
  approvedLoanAmount: number;
  approvedLoanTermMonths: number;
  productCode?: string;
};

export type TPaymentRequest = {
  customerTimezoneOffset: number;
  requestedLoanAmount: number;
  requestedLoanTermMonths: number;
  jobLossProtection: boolean;
  lifeAndHealthProtection: boolean;
  smsInforming: boolean;
  campaignParticipant: boolean;
  workExperience?: number;
  campaign?: string;
  productCode?: string;
};

export type TAdditionsModalType = 'smsService' | 'job' | 'life' | 'diffHave';

export type TPaymentByType = Record<TAdditionsModalType, number>;
