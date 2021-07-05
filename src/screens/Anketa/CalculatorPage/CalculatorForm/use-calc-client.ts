import React from 'react';
import {useFetch} from 'utils/use-fetch';
import {TFormState, IFormChanges, initFormState, TCalculatorParams} from './types';

const formStateReducer = (state: TFormState, changes: IFormChanges) => {
  switch (changes.type) {
    case 'ADD_ERROR': {
      const fieldName = changes.fieldName as string;
      return {
        ...state,
        error: {
          ...state.error,
          [fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [fieldName]: true,
        },
      };
    }
    case 'CHANGE_VALUE': {
      const fieldName = changes.fieldName as string;
      return {
        ...state,
        values: {
          ...state.values,
          [fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [fieldName]: true,
        },
        error: {
          ...state.error,
          [fieldName]: '',
        },
      };
    }
    default:
      return state;
  }
};

function minMaxValidator(value: number, options: {minLimit: number; maxlimit: number; errorMessage: string}) {
  const minCheck = value >= options.minLimit;
  const maxCheck = value <= options.maxlimit;
  if (minCheck && maxCheck) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: options.errorMessage});
  }
}

const initCalculatorParams: TCalculatorParams = {
  approvedLoanAmount: 0,
  approvedLoanTermMonths: 0,
  maxLoanAmount: 0,
  maxLoanTermMonths: 0,
  minLoanAmount: 0,
  minLoanTermMonths: 0,
  productCode: null,
};

export function useCalcClient(campaignName?: string) {
  const [calculatorParams, setCalculatorParams] = React.useState<TCalculatorParams | null>(null);
  const [{values, error, touched}, dispatch] = React.useReducer(formStateReducer, initFormState);

  const fetchClient = useFetch();
  const {maxLoanAmount, maxLoanTermMonths, minLoanAmount, minLoanTermMonths} = calculatorParams
    ? calculatorParams
    : initCalculatorParams;

  const getCalculatorParams = React.useCallback(() => {
    fetchClient('/gateway/credit-application/get-calculator-params', {body: {campaignName}}).then(
      (response: TCalculatorParams) => {
        setCalculatorParams(response);
        if (response?.approvedLoanAmount || response?.approvedLoanTermMonths) {
          dispatch({
            type: 'CHANGE_VALUE',
            fieldName: 'requestedLoanAmount',
            payload: response.approvedLoanAmount,
          });
          dispatch({
            type: 'CHANGE_VALUE',
            fieldName: 'requestedLoanTermMonths',
            payload: response.approvedLoanTermMonths,
          });
          dispatch({
            type: 'CHANGE_VALUE',
            fieldName: 'productCode',
            payload: response.productCode,
          });
          dispatch({
            type: 'CHANGE_VALUE',
            fieldName: 'campaign',
            payload: campaignName,
          });
        }
      },
      e => {
        console.error(e);
      },
    );
  }, [campaignName, fetchClient]);

  const getWorkExperience = React.useCallback(() => {
    fetchClient('/gateway/customer-profile/get-work-experience', {method: 'post'}).then(
      (data: any) => {
        //const rateByExperience = getRate(data?.workExperienceMonths);
        dispatch({type: 'CHANGE_VALUE', fieldName: 'workExperience', payload: data?.workExperienceMonths});
        //dispatch({type: 'CHANGE_VALUE', fieldName: 'rate', payload: rateByExperience});
      },
      error => {
        //const fallbackRate = getRate(1);
        dispatch({type: 'CHANGE_VALUE', fieldName: 'workExperience', payload: 1});
        //dispatch({type: 'CHANGE_VALUE', fieldName: 'rate', payload: fallbackRate});
        console.error(error.message);
      },
    );
  }, [fetchClient]);

  const validateLoanAmount = React.useCallback(
    async (value: number) => {
      try {
        const errorMessage = `Введите от ${minLoanAmount.toLocaleString(
          'ru',
        )} до ${maxLoanAmount.toLocaleString('ru')} рублей.`;
        await minMaxValidator(value, {
          minLimit: minLoanAmount,
          maxlimit: maxLoanAmount,
          errorMessage,
        });
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanAmount', payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanAmount', payload: error.message});
        return false;
      }
    },
    [maxLoanAmount, minLoanAmount],
  );

  const validateLoanTerm = React.useCallback(
    async (value: number) => {
      try {
        const errorMessage = `Введите от ${minLoanTermMonths} месяцев до ${maxLoanTermMonths} месяцев.`;
        await minMaxValidator(value, {
          minLimit: minLoanTermMonths,
          maxlimit: maxLoanTermMonths,
          errorMessage,
        });
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanTermMonths', payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanTermMonths', payload: error.message});
        return false;
      }
    },
    [maxLoanTermMonths, minLoanTermMonths],
  );

  const validateAllFields = React.useCallback(() => {
    return Promise.all([
      validateLoanAmount(values.requestedLoanAmount),
      validateLoanTerm(values.requestedLoanTermMonths),
    ]);
  }, [validateLoanAmount, validateLoanTerm, values.requestedLoanAmount, values.requestedLoanTermMonths]);

  return {
    values,
    error,
    getWorkExperience,
    dispatch,
    validateLoanAmount,
    validateLoanTerm,
    validateAllFields,
    touched,
    getCalculatorParams,
    calculatorParams,
  };
}
