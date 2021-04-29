import React from 'react';
import {useFetch} from 'utils/use-fetch';
import {getRate} from './utils';
import {TFormState, IFormChanges, initFormState} from './types';

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

export function useCalcClient(maxAmount: number) {
  const [{values, error, touched}, dispatch] = React.useReducer(formStateReducer, initFormState);
  const fetchClient = useFetch();
  const min = 30000;
  const max = maxAmount;

  const minTerm = values.campaignParticipant ? 24 : 12;
  const maxTerm = 60;

  const getWorkExperience = React.useCallback(() => {
    fetchClient('/gateway/customer-profile/get-work-experience', {method: 'post'}).then(
      (data: any) => {
        const rateByExperience = getRate(data?.workExperienceMonths);
        dispatch({type: 'CHANGE_VALUE', fieldName: 'workExperience', payload: data?.workExperienceMonths});
        dispatch({type: 'CHANGE_VALUE', fieldName: 'rate', payload: rateByExperience});
      },
      error => {
        const fallbackRate = getRate(1);
        dispatch({type: 'CHANGE_VALUE', fieldName: 'workExperience', payload: 1});
        dispatch({type: 'CHANGE_VALUE', fieldName: 'rate', payload: fallbackRate});
        console.error(error.message);
      },
    );
  }, [fetchClient]);

  const validateLoanAmount = React.useCallback(
    async (value: number) => {
      try {
        const errorMessage = `Введите от 30 000 до ${max.toLocaleString('ru')} рублей.`;
        await minMaxValidator(value, {
          minLimit: min,
          maxlimit: max,
          errorMessage,
        });
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanAmount', payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanAmount', payload: error.message});
        return false;
      }
    },
    [max],
  );

  const validateLoanTerm = React.useCallback(
    async (value: number) => {
      try {
        const errorMessage = `Введите от ${minTerm} месяцев до ${maxTerm} месяцев.`;
        await minMaxValidator(value, {
          minLimit: minTerm,
          maxlimit: maxTerm,
          errorMessage,
        });
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanTermMonths', payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: 'requestedLoanTermMonths', payload: error.message});
        return false;
      }
    },
    [minTerm],
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
  };
}
