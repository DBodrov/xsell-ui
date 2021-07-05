import React from 'react';
import {isEmptyString} from 'utils/string.utils';
import {mobilePhoneValidator, isDateValidator, maxDateValidator, minDateValidator} from './utils';
import {TFormState, IFormChanges} from './types';

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

    default:
      return state;
  }
};

const initState: TFormState = {
  values: {
    birthDate: '',
    phoneNumber: '',
    consentAgree: false,
    distanceAgreement: false,
  },
  touched: {
    birthDate: false,
    phoneNumber: false,
    consentAgree: false,
    distanceAgreement: false,
  },
  error: {
    birthDate: '',
    phoneNumber: '',
    consentAgree: '',
    distanceAgreement: '',
  },
};

export function useSignin(initValues = initState) {
  const [{values, touched, error}, dispatch] = React.useReducer(formStateReducer, initValues);

  const changePhoneNumber = (phone: string) =>
    dispatch({type: 'CHANGE_VALUE', fieldName: 'phoneNumber', payload: phone});
  const changeBirthDate = (date: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'birthDate', payload: date});
  };
  const changeConsentAgree = (isAgree: boolean) =>
    dispatch({type: 'CHANGE_VALUE', fieldName: 'consentAgree', payload: isAgree});
  const changeDistanceAgreement = (isAgree: boolean) =>
    dispatch({type: 'CHANGE_VALUE', fieldName: 'distanceAgreement', payload: isAgree});

  const validateDate = React.useCallback(async (date?: string) => {
    try {
      await isDateValidator(date);
      await maxDateValidator(date);
      await minDateValidator(date);
      dispatch({type: 'ADD_ERROR', fieldName: 'birthDate', payload: ''});
      return true;
    } catch (e) {
      dispatch({type: 'ADD_ERROR', fieldName: 'birthDate', payload: e.message});
      return false;
    }
  }, []);

  const validatePhoneNumber = React.useCallback(async () => {
    try {
      await mobilePhoneValidator(values.phoneNumber);
      dispatch({type: 'ADD_ERROR', fieldName: 'phoneNumber', payload: ''});
      return true;
    } catch (e) {
      dispatch({type: 'ADD_ERROR', fieldName: 'phoneNumber', payload: e.message});
      return false;
    }
  }, [values.phoneNumber]);

  const validateAgreementFields = React.useCallback(() => {
    if (!values.consentAgree) {
      dispatch({type: 'ADD_ERROR', fieldName: 'consentAgree', payload: 'invalid'});
    }
    if (!values.distanceAgreement) {
      dispatch({type: 'ADD_ERROR', fieldName: 'distanceAgreement', payload: 'invalid'});
    }
    return values.consentAgree && values.distanceAgreement;
  }, [values.consentAgree, values.distanceAgreement]);

  const hasPhoneNumberError = !isEmptyString(error.phoneNumber) && touched.phoneNumber;
  const hasBirthDateError = !isEmptyString(error.birthDate) && touched.birthDate;
  const hasConsentAgreeError = !isEmptyString(error.consentAgree) && touched.consentAgree;
  const hasDistanceAgreementError = !isEmptyString(error.distanceAgreement) && touched.distanceAgreement;

  return {
    values,
    error,

    changeBirthDate,
    changePhoneNumber,
    changeConsentAgree,
    changeDistanceAgreement,

    validateDate,
    validatePhoneNumber,
    validateAgreementFields,

    hasBirthDateError,
    hasConsentAgreeError,
    hasPhoneNumberError,
    hasDistanceAgreementError,
  };
}
