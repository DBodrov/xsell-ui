import React from 'react';
import {useAnketa} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {OTP_INN} from 'utils/externals';
import {isEmptyString} from 'utils/string.utils';

type TJobinfo = {
  formData: {
    workPlace?: string;
    workIndustry?: string;
    workInn?: string;
    lastWorkExperienceMonths?: string;
    mainMonthlyIncomeAmount?: string;
    creditBureauConsentAgree?: boolean;
  };
  errorState: {
    workPlace?: string;
    workIndustry?: string;
    workInn?: string;
    lastWorkExperienceMonths?: string;
    mainMonthlyIncomeAmount?: string;
    creditBureauConsentAgree?: string;
  };
  touchedState: typeof initTouchedState;
};

const jobInfoReducer = (s: TJobinfo, changes: Partial<TJobinfo>) => {
  const updatedState = {...s, ...changes};
  // console.log(updatedState)
  return updatedState;
};

const initErrorState = {
  workPlace: '',
  workIndustry: '',
  workInn: '',
  lastWorkExperienceMonths: '',
  mainMonthlyIncomeAmount: '',
  creditBureauConsentAgree: '',
};

const initTouchedState = {
  workPlace: false,
  workIndustry: false,
  workInn: false,
  lastWorkExperienceMonths: false,
  mainMonthlyIncomeAmount: false,
};

const initState: TJobinfo = {
  formData: {
    workPlace: '',
    workIndustry: undefined,
    workInn: '',
    lastWorkExperienceMonths: '',
    mainMonthlyIncomeAmount: '',
    creditBureauConsentAgree: false,
  },
  touchedState: initTouchedState,
  errorState: initErrorState,
};

const validationSchema = {
  workPlace: {
    isRequired: {error: 'Место работы не может быть пустым'},
  },
  workInn: {
    isRequired: {error: 'ИНН обязателен к заполнению'},
    customCheck: {
      options: (value: string) => value?.length === 10 || value?.length === 12,
      error: 'ИНН должен быть длиной 10 или 12 цифр',
    },
  },
  workIndustry: {
    isRequired: {error: 'Выберите отрасль занятости'},
  },
  lastWorkExperienceMonths: {
    min: {options: 3, error: 'Стаж должен быть больше 3 месяцев'},
  },
  mainMonthlyIncomeAmount: {
    min: {
      options: 1000,
      error: 'Доход не может быть менее 1 000 рублей',
    },
    max: {options: 1000000, error: 'Доход не может быть более 1 000 000 рублей'},
  },
  creditBureauConsentAgree: {
    isEqual: {options: true, error: ''},
  },
};

export function useJobinfoForm(isStaffCampaign = false) {
  const [{formData, errorState, touchedState}, dispatch] = React.useReducer(jobInfoReducer, initState);


  const {updateAnketa, step} = useAnketa();
  const fetchClient = useFetch();

  const handleChangeAddress = React.useCallback(() => {
    updateAnketa(step, {registrationAddressChanged: true});
  }, [step, updateAnketa]);

  const validateRequiredField = React.useCallback(
    (value: string, e: React.FocusEvent<HTMLInputElement>): boolean => {
      const field = e.currentTarget.name;
      const val = formData[field];
      const schema = validationSchema[field];
      if (!val) {
        dispatch({
          touchedState: {...touchedState, [field]: true},
          errorState: {...errorState, [field]: schema.isRequired.error},
        });
        return false;
      } else {
        dispatch({
          touchedState: {...touchedState, [field]: true},
          errorState: {...errorState, [field]: ''},
        });
        return true;
      }
    },
    [errorState, formData, touchedState],
  );

  const validateMinValue = React.useCallback(
    (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      const val = Number(formData[field]);
      const schema = validationSchema[field];
      const isValid = val >= schema.min.options;
      return isValid;
    },
    [formData],
  );

  const validateMaxValue = React.useCallback(
    (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const field = e.currentTarget.name;
      const val = Number(formData[field]);
      const schema = validationSchema[field];
      const isValid = val <= schema.max.options;
      return isValid;
    },
    [formData],
  );

  const validateMonthlyAmount = React.useCallback(
    (value: number, e?: React.FocusEvent<HTMLInputElement>) => {
      const isMinValid = validateMinValue(null, e);
      const field = e.currentTarget.name;
      const schema = validationSchema[field];
      if (!isMinValid) {
        dispatch({
          touchedState: {...touchedState, [field]: true},
          errorState: {...errorState, [field]: schema.min.error},
        });
      }
      if (isMinValid) {
        const isMaxValid = validateMaxValue(null, e);
        dispatch({
          touchedState: {...touchedState, [field]: true},
          errorState: {...errorState, [field]: isMaxValid ? '' : schema.max.error},
        })
      }
    },
    [errorState, touchedState, validateMaxValue, validateMinValue],
  );

  const validateLastWorkExpirience = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const isMinValid = validateMinValue(null, e);
    const schema = validationSchema.lastWorkExperienceMonths;
    dispatch({
      touchedState: {...touchedState, lastWorkExperienceMonths: true},
      errorState: {...errorState, lastWorkExperienceMonths: isMinValid ? '' : schema.min.error},
    })
  }, [errorState, touchedState, validateMinValue]);

  const validateInn = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const schema = validationSchema.workInn;
      if (formData?.workInn) {
        const inn = formData.workInn;
        const lengthValid = inn.length === 10 || inn.length === 12;
        dispatch({
          touchedState: {...touchedState, workInn: true},
          errorState: {...errorState, workInn: lengthValid ? '' : schema.customCheck.error},
        });
      } else {
        dispatch({
          touchedState: {...touchedState, workInn: true},
          errorState: {...errorState, workInn: schema.isRequired.error},
        });
      }
    },
    [errorState, formData.workInn, touchedState],
  );

  const formValid = React.useCallback(() => {
    const isAllTouched = Object.values(touchedState).every(Boolean);
    const noErrors = Object.values(errorState).every(isEmptyString);
    return isAllTouched && noErrors && formData.creditBureauConsentAgree;
  }, [errorState, formData.creditBureauConsentAgree, touchedState]);

  const handleFormSubmit = React.useCallback(() => {
    const jobInfo = {...formData, workInn: formData.workInn.replace(/_/gi, '')};
    updateAnketa('DETAILS', jobInfo);
  }, [formData, updateAnketa]);

  React.useEffect(() => {
    const getWorkExperience = () => {
      fetchClient('/gateway/customer-profile/get-work-experience', {method: 'post'}).then(
        response => {
          const {workExperienceMonths} = response;
          dispatch({
            formData: {
              workPlace: 'ОТП Банк',
              lastWorkExperienceMonths: workExperienceMonths,
              workIndustry: 'RGB_INDUSTRY_18$1',
              workInn: OTP_INN,
            },
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
    formData,
    dispatch,
    handleFormSubmit,
    validateRequiredField,
    errorState,
    validateInn,
    validateMinValue,
    validateMonthlyAmount,
    validateLastWorkExpirience,
    formValid,
  };
}

