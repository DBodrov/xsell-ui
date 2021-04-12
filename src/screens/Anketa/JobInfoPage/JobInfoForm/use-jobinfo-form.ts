import React from 'react';
import {useAnketa} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {OTP_INN} from 'utils/externals';
import {isEmptyString} from 'utils/string.utils';
import {
  innLengthValidator,
  requiredFieldValidator,
  minValueValidator,
  maxValueValidator,
} from './validate.utils';
import {IFormChanges, TFormState, initState} from './types';

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

export function useJobinfoForm(isStaffCampaign = false) {
  const [{values, error, touched}, dispatch] = React.useReducer(formStateReducer, initState);

  const {updateAnketa, step} = useAnketa();
  const fetchClient = useFetch();

  const handleChangeAddress = React.useCallback(() => {
    updateAnketa(step, {registrationAddressChanged: true});
  }, [step, updateAnketa]);

  const validateRequiredField = React.useCallback(
    async (value: string, e: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      const val = values[field];
      try {
        await requiredFieldValidator(field, val);
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: error.message});
      }
    },
    [values],
  );

  const validateMinValue = React.useCallback(
    async (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      try {
        await minValueValidator(field, value);
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: error.message});
        return false;
      }
    },
    [],
  );

  const validateMaxValue = React.useCallback(
    async (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      try {
        await maxValueValidator(field, value);
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: error.message});
        return false;
      }
    },
    [],
  );

  const validateMonthlyAmount = React.useCallback(
    async (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      try {
        await minValueValidator(field, value);
        await maxValueValidator(field, value);
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: field, payload: error.message});
        return false;
      }
    },
    [],
  );

  const validateLastWorkExperience = React.useCallback(
    async (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      try {
        await minValueValidator('lastWorkExperienceMonths', value);
        dispatch({type: 'ADD_ERROR', fieldName: 'lastWorkExperienceMonths', payload: ''});
        return true;
      } catch (error) {
        dispatch({type: 'ADD_ERROR', fieldName: 'lastWorkExperienceMonths', payload: error.message});
        return false;
      }
    },
    [],
  );

  const validateInn = React.useCallback(async (workInn: string) => {
    const fieldName = 'workInn';
    try {
      await requiredFieldValidator('workInn', workInn);
      await innLengthValidator(workInn);
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
  }, []);

  const formValid = React.useCallback(() => {
    const isAllTouched = Object.values(touched).every(Boolean);
    const noErrors = Object.values(error).every(isEmptyString);
    return isAllTouched && noErrors && values.creditBureauConsentAgree;
  }, [error, touched, values.creditBureauConsentAgree]);

  const handleFormSubmit = React.useCallback(() => {
    const jobInfo = {...values, workInn: values.workInn.replace(/_/gi, '')};
    updateAnketa('DETAILS', jobInfo);
  }, [updateAnketa, values]);

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

          Object.keys(fillFormFields).forEach(field => {
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
    validateMinValue,
    validateMonthlyAmount,
    validateLastWorkExperience,
    formValid,
  };
}
