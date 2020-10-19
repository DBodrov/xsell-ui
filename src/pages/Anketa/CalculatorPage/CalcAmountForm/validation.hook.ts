import { useCallback, useRef } from 'react';
import { TLoanParams } from './CalcAmountForm';

type Field = keyof TLoanParams;

const minCheck = (value: number, limit: number) => value >= limit;
const maxCheck = (value: number, limit: number) => value <= limit;

export function useValidationCalc(isStaff = false, isDiffHave = false) {
  const amountErrorMessage = `Сумма кредита должна быть в диапазоне от 30 000 до ${
    isStaff ? '3 000 000' : '1 000 000'
  } рублей.`;
  const termErrorMessage = `Срок кредита должен быть в диапазоне от ${isDiffHave ? 2 : 1} до 5 лет.`;
  const errorState = useRef({});

  const setError = (field: Field, message: string) => {
    errorState.current[field] = message;
  };

  const removeError = (field: Field) => {
    if (errorState.current.hasOwnProperty(field)) {
      delete errorState.current[field];
    }
    return;
  };

  const validateLoanParam = useCallback(
    (field: Field, value: any) => {
      let message: string;
      if (field === 'requestedLoanAmount') {
        const isValid = minCheck(value, 30000) && maxCheck(value, isStaff ? 3000000 : 1000000);
        if (isValid) {
          removeError(field);
          return;
        } else {
          message = amountErrorMessage;
        }
      }
      if (field === 'requestedLoanTermMonths') {
        const min = isDiffHave ? 24 : 12;
        const isValid = minCheck(value, min) && maxCheck(value, 60);
        if (isValid) {
          removeError(field);
          return;
        } else {
          message = termErrorMessage;
        }
      }
      setError(field, message);
    },
    [amountErrorMessage, isDiffHave, isStaff, termErrorMessage]
  );

  const validateBeforeSubmit = (loanParams?: TLoanParams) => {
    validateLoanParam('requestedLoanTermMonths', loanParams.requestedLoanTermMonths);
    validateLoanParam('requestedLoanAmount', loanParams.requestedLoanAmount);
    return errorState;


  }

  const formIsValid = Object.keys(errorState.current).length === 0;
  const readError = useCallback((field: Field): string => errorState.current[field], []);

  return { formIsValid, validateLoanParam, validateBeforeSubmit, errorState, readError };
}
