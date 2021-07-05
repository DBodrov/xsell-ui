import React from 'react';
import {TFormState, IFormChanges} from './types';
import {
  validateAccountAndBic,
  validateAccountLength,
  validateAccountStartWith,
  notFoundedBic,
  validateBicLength,
  searchBank,
} from './utils';

const formStateReducer = (state: TFormState, changes: IFormChanges) => {
  switch (changes.type) {
    case 'ADD_ERROR': {
      return {
        ...state,
        error: {
          ...state.error,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
      };
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
        error: {
          ...state.error,
          [changes.fieldName]: '',
        },
      };
    }
    case 'ADD_FOUNDED': {
      return {
        ...state,
        values: {
          ...state.values,
          [changes.fieldName]: changes.payload,
        },
      };
    }

    default:
      return state;
  }
};

const initFormState: TFormState = {
  values: {
    accountNumber: '',
    bankIdCode: '',
    searchResult: [],
  },
  error: {
    accountNumber: '',
    bankIdCode: '',
  },
  touched: {
    accountNumber: false,
    bankIdCode: false,
  },
};

export function useAccountForm() {
  const [{values, touched, error}, dispatch] = React.useReducer(formStateReducer, initFormState);

  const changeAccount = React.useCallback((account: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'accountNumber', payload: account});
  }, []);

  const changeBic = React.useCallback(async (bankIdCode: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'bankIdCode', payload: bankIdCode});
    if (bankIdCode.length >= 3) {
      const suggestions = await searchBank(bankIdCode);
      dispatch({type: 'ADD_FOUNDED', fieldName: 'searchResult', payload: suggestions});
    }
  }, []);

  const setFoundedBic = React.useCallback((bankIdCode: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'bankIdCode', payload: bankIdCode});
  }, []);

  const validateAccountName = React.useCallback(async () => {
    try {
      await validateAccountLength(values.accountNumber);
      await validateAccountStartWith(values.accountNumber);
      dispatch({type: 'ADD_ERROR', fieldName: 'accountNumber', payload: ''});
      return true;
    } catch (error) {
      dispatch({type: 'ADD_ERROR', fieldName: 'accountNumber', payload: error.message});
      return false;
    }
  }, [values.accountNumber]);

  const validateBankIdCode = React.useCallback(async () => {
    try {
      await validateBicLength(values.bankIdCode);
      await notFoundedBic(values.bankIdCode, values.searchResult);
      dispatch({type: 'ADD_ERROR', fieldName: 'bankIdCode', payload: ''});
      return true;
    } catch (error) {
      dispatch({type: 'ADD_ERROR', fieldName: 'bankIdCode', payload: error.message});
      return false;
    }
  }, [values.bankIdCode, values.searchResult]);

  const validatePairAccountAndBankIdCode = React.useCallback(async () => {
    try {
      await validateAccountAndBic(values.accountNumber, values.bankIdCode);
      dispatch({type: 'ADD_ERROR', fieldName: 'accountNumber', payload: ''});
      return true;
    } catch (error) {
      dispatch({type: 'ADD_ERROR', fieldName: 'accountNumber', payload: error.message});
      return false;
    }
  }, [values.accountNumber, values.bankIdCode])

  const validateBeforeSubmit = React.useCallback(async () => {
    const accountNameIsValid = await validateAccountName();
    const bicIsValid = await validateBankIdCode();
    if (accountNameIsValid && bicIsValid) {
      const pairIsValid = await validatePairAccountAndBankIdCode();
      return pairIsValid;
    }
    return accountNameIsValid && bicIsValid


  }, [validateAccountName, validateBankIdCode, validatePairAccountAndBankIdCode])

  return {
    values,
    touched,
    error,

    changeAccount,
    changeBic,
    setFoundedBic,

    validateAccountName,
    validateBankIdCode,
    validateBeforeSubmit
  };
}
