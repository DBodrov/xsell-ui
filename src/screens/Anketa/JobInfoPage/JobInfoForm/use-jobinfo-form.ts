import React from 'react';
import {useAnketa} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {OTP_INN} from 'utils/externals';
import {isEmptyString, onlyDigit} from 'utils/string.utils';
import {
  innLengthValidator,
  requiredFieldValidator,
  minValueValidator,
  maxValueValidator,
  mobilePhoneValidator,
} from './validate.utils';

import {IFormChanges, TFormState, initState, TFieldName} from './types';

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
      };
    }
    default:
      return state;
  }
};

export function useJobinfoForm(isStaffCampaign = false) {
  const [{values, error, touched}, dispatch] = React.useReducer(formStateReducer, initState);

  const {updateAnketa, step} = useAnketa();
  const fetchClient = useFetch();

  const handleChangeAddress = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      updateAnketa(step, {registrationAddressChanged: true});
    },
    [step, updateAnketa],
  );

  const validateRequiredField = React.useCallback(
    async (fieldName: TFieldName) => {
      const val = values[fieldName] as string | number;
      try {
        await requiredFieldValidator(fieldName, val);
        dispatch({type: 'ADD_ERROR', fieldName, payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName, payload: error.message});
      }
    },
    [values],
  );

  const validateMonthlyAmount = React.useCallback(async () => {
    const field = 'mainMonthlyIncomeAmount';
    try {
      await minValueValidator(field, Number(values.mainMonthlyIncomeAmount));
      await maxValueValidator(field, Number(values.mainMonthlyIncomeAmount));
      dispatch({type: 'ADD_ERROR', fieldName: field, payload: ''});
      return true;
    } catch (error) {
      dispatch({type: 'ADD_ERROR', fieldName: field, payload: error.message});

      return false;
    }
  }, [values.mainMonthlyIncomeAmount]);

  const validateLastWorkExperience = React.useCallback(async () => {
    try {
      await minValueValidator('lastWorkExperienceMonths', Number(values.lastWorkExperienceMonths));
      dispatch({type: 'ADD_ERROR', fieldName: 'lastWorkExperienceMonths', payload: ''});
      return true;
    } catch (error) {
      dispatch({type: 'ADD_ERROR', fieldName: 'lastWorkExperienceMonths', payload: error.message});
      return false;
    }
  }, [values.lastWorkExperienceMonths]);

  const validateInn = React.useCallback(async () => {
    const fieldName = 'workInn';

    try {
      await requiredFieldValidator('workInn', values.workInn);
      await innLengthValidator(values.workInn);
      dispatch({type: 'ADD_ERROR', fieldName, payload: ''});
      return true;
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        fieldName,
        payload: error.message,
      });
      return false;
    }
  }, [values.workInn]);

  const validateAdditionalPhoneNumber = React.useCallback(async () => {
    try {
      await mobilePhoneValidator(values.additionalPhone);
      dispatch({type: 'ADD_ERROR', fieldName: 'additionalPhone', payload: ''});
      return true;
    } catch (e) {
      dispatch({type: 'ADD_ERROR', fieldName: 'additionalPhone', payload: e.message});
      return false;
    }
  }, [values.additionalPhone]);

  const formValid = React.useCallback(() => {
    const isAllTouched = Object.values(touched).every(Boolean);
    const noErrors = Object.values(error).every(isEmptyString);
    return (
      isAllTouched &&
      noErrors &&
      values.notarialRecord &&
      values.creditBureauConsentAgree &&
      values.personalDataProcessingConsentAgree
    );
  }, [
    error,
    touched,
    values.creditBureauConsentAgree,
    values.notarialRecord,
    values.personalDataProcessingConsentAgree,
  ]);

  const validateAllFields = React.useCallback(() => {
    return Promise.all([
      validateInn(),
      validateLastWorkExperience(),
      validateMonthlyAmount(),
      validateRequiredField('workIndustry'),
      validateRequiredField('workPlace'),
      validateAdditionalPhoneNumber(),
    ]);
  }, [
    validateAdditionalPhoneNumber,
    validateInn,
    validateLastWorkExperience,
    validateMonthlyAmount,
    validateRequiredField,
  ]);

  const handleFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validateAllFields().then(() => {
        const anketa = {...values, additionalPhone: `7${onlyDigit(values.additionalPhone)}`}
        updateAnketa('DETAILS', anketa);
      });
    },
    [updateAnketa, validateAllFields, values],
  );

  React.useEffect(() => {
    const getWorkExperience = () => {
      fetchClient('/gateway/customer-profile/get-work-experience', {method: 'post'}).then(
        response => {
          const {workExperienceMonths} = response;
          const fillFormFields = {
            workPlace: 'ОТП Банк',
            lastWorkExperienceMonths: workExperienceMonths,
            workIndustry: 'RGB_INDUSTRY_18$1',
            workInn: OTP_INN,
          };

          Object.keys(fillFormFields).forEach((field: TFieldName) => {
            dispatch({type: 'CHANGE_VALUE', fieldName: field, payload: fillFormFields[field]});
          });
          return response;
        },
        error => {
          console.error(error);
          return error;
        },
      );
    };

    isStaffCampaign && getWorkExperience();
  }, [fetchClient, isStaffCampaign]);

  return {
    handleChangeAddress,
    values,
    dispatch,
    handleFormSubmit,
    error,
    validateRequiredField,
    validateInn,
    validateMonthlyAmount,
    validateLastWorkExperience,
    validateAdditionalPhoneNumber,
    formValid,
  };
}
