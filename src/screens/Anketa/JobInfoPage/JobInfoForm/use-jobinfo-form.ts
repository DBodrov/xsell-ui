import React from 'react';
import {useAnketa} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {OTP_INN} from 'utils/externals';

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

export function useJobinfoForm(isStaffCampaign = false) {
  const [formData, dispatch] = React.useReducer(jobInfoReducer, {
    workPlace: '',
    workIndustry: undefined,
    workInn: undefined,
    lastWorkExperienceMonths: undefined,
    mainMonthlyIncomeAmount: undefined,
    creditBureauConsentAgree: false,
  });

  const {updateAnketa, step} = useAnketa();
  const fetchClient = useFetch();

  const handleChangeAddress = React.useCallback(() => {
    updateAnketa(step, {registrationAddressChanged: true});
  }, [step, updateAnketa]);

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

  console.log(isStaffCampaign, formData);

  return {
    handleChangeAddress,
    formData,
    dispatch,
  };
}
