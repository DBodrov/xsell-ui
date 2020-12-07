import React from 'react';
import {useAnketa} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {OTP_INN} from 'utils/externals';
import {isEmptyString} from 'utils/string.utils';

type TJobinfo = {
  workPlace?: string;
  workIndustry?: string;
  workInn?: string;
  lastWorkExperienceMonths?: number;
  mainMonthlyIncomeAmount?: number;
  creditBureauConsentAgree: boolean;
};

const jobInfoReducer = (s: TJobinfo, changes: Partial<TJobinfo>) => {
  const updatedState = {...s, ...changes};
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
}

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
  const [formData, dispatch] = React.useReducer(jobInfoReducer, {
    workPlace: '',
    workIndustry: undefined,
    workInn: undefined,
    lastWorkExperienceMonths: undefined,
    mainMonthlyIncomeAmount: undefined,
    creditBureauConsentAgree: false,
  });

  const [touched, setTouched] = React.useState(initTouchedState);
  const [errorState, setError] = React.useState(initErrorState);

  const {updateAnketa, step} = useAnketa();
  const fetchClient = useFetch();

  const handleChangeAddress = React.useCallback(() => {
    updateAnketa(step, {registrationAddressChanged: true});
  }, [step, updateAnketa]);

  const validateRequiredField = React.useCallback(
    (value: string, e: React.FocusEvent<HTMLInputElement>): boolean => {
      const field = e.currentTarget.name;
      setTouched(t => ({...t, [field]: true}));
      const val = formData[field];
      const schema = validationSchema[field];
      if (!val) {
        setError(e => ({...e, [field]: schema.isRequired.error}));
        return false;
      } else {
        setError(e => ({...e, [field]: ''}));
        return true;
      }
    },
    [formData],
  );

  const validateMinValue = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const field = e.currentTarget.name;
    setTouched(t => ({...t, [field]: true}));
    const val = Number(formData[field]);
    const schema = validationSchema[field];
    const isValid = val >= schema.min.options;
    setError(e => ({...e, [field]: isValid ? '' : schema.min.error}));
    return isValid;
  }, [formData]);

  const validateMaxValue = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const field = e.currentTarget.name;
    const val = Number(formData[field]);
    const schema = validationSchema[field];
    const isValid = val <= schema.max.options;
    setError(e => ({...e, [field]: isValid ? '' : schema.max.error}));
    return isValid;
  }, [formData]);

  const validateMonthlyAmount = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const isMinValid = validateMinValue(null, e);
    if (isMinValid) {
      validateMaxValue(null, e);
    }
  }, [validateMaxValue, validateMinValue])

  const validateInn = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const requiredValid = validateRequiredField(null, e);
      const schema = validationSchema.workInn;
      if (requiredValid) {
        const inn = formData.workInn.replace(/_/gi, '');
        const lengthValid = inn.length === 10 || inn.length === 12;
        setError(e => ({...e, workInn: lengthValid ? '' : schema.customCheck.error}));
        return lengthValid;
      }
    },
    [formData.workInn, validateRequiredField],
  );

  const formValid = React.useCallback(() => {
    const isAllTouched = Object.values(touched).every(Boolean);
    const noErrors = Object.values(errorState).every(isEmptyString)
    return isAllTouched && noErrors && formData.creditBureauConsentAgree;
  }, [errorState, formData.creditBureauConsentAgree, touched]);

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
            workPlace: 'ОТП Банк',
            lastWorkExperienceMonths: workExperienceMonths,
            workIndustry: 'RGB_INDUSTRY_18$1',
            workInn: OTP_INN,
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
    formValid
  };
}
