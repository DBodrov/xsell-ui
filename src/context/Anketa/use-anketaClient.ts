import {useCallback, useReducer} from 'react';
import {useFetch} from 'utils/use-fetch';
import {useError, ErrorState} from '../Error';
import {IAnketaState, TAnketaStep, IAnketa} from './types';

const BASE_URL = '/gateway/credit-application';
// const PROFILE_URL = '/gateway/customer-profile';

export const anketaUpdateAPI: Partial<Record<TAnketaStep | string, string>> = {
  LOAN_PARAMS: `${BASE_URL}/update-session-app-loan-params`,
  PASSPORT: `${BASE_URL}/update-session-app-passport`,
  REGISTRATION_ADDRESS: `${BASE_URL}/update-session-app-registration-address`,
  DETAILS: `${BASE_URL}/submit-form`,
  PASSPORT_PHOTO: `${BASE_URL}/update-session-app-confirm-upload-passport-photo`,
  TRANSFER_DETAILS: `${BASE_URL}/update-session-app-account-transfer-details`,
  TRANSFER_DETAILS_CARDS: `${BASE_URL}/update-session-app-card-transfer-details`,
  TRANSFER_DETAILS_SBP: `${BASE_URL}/update-session-app-outer-card-transfer-details`,
  AGREEMENT_SMS_CODE: `${BASE_URL}/verify-agreement-signature`,
  APPROVED: `${BASE_URL}/agree-to-sign-documents`,
  SIGNATURE_SMS_CODE: `${BASE_URL}/verify-signature-code`,
};

const initialAnketaState: IAnketaState = {status: 'idle', data: {anketa: null, step: null}};
const anketaReducer = (s: IAnketaState, a: IAnketaState) => {
  // console.log(s, a, {...s, ...a});
  return {...s, ...a};
};

export function useAnketaClient() {
  const [{status, data}, setState] = useReducer(anketaReducer, initialAnketaState);
  const fetchClient = useFetch();
  const {setErrorState} = useError();

  const errorHandler = useCallback(
    (error: ErrorState | any) => {
      setState({status: 'rejected'});
      setErrorState(error);
      return error;
    },
    [setErrorState],
  );

  const getAnketa = useCallback(() => {
    setState({status: 'pending'});
    fetchClient(`${BASE_URL}/get-session-app`, {body: {}}).then(
      response => {
        const {status, ...restData} = response;
        setState({status: 'resolved', data: {step: status, anketa: {...restData}}});
        return response;
      },
      error => errorHandler(error),
    );
  }, [errorHandler, fetchClient]);

  const updateAnketa = useCallback(
    (step: TAnketaStep | string, anketa: Partial<IAnketa> | Record<string, unknown>) => {
      setState({status: 'pending'});
      setErrorState(undefined);
      fetchClient(anketaUpdateAPI[step], {body: anketa}).then(
        data => {
          //setState({status: 'resolved'});
          getAnketa();
          return data;
        },
        error => {
          console.error(error)
          errorHandler(error);
        },
      );
    },
    [errorHandler, fetchClient, getAnketa, setErrorState],
  );

  const verifySignature = useCallback(
    (step: string, payload: Record<string, unknown>) => {
      setState({status: 'pending'});
      setErrorState(undefined);
      fetchClient(anketaUpdateAPI[step], {body: payload}).then(
        response => {
          if (response.verified || response.code === 'OK') {
            setState({status: 'resolved'});
            getAnketa();
          } else {
            setState({status: 'rejected'});
            setErrorState({
              status: 400,
              message: 'Неверный код. Чтобы продолжить оформление кредита введите корректный код из СМС',
            });
          }
          return response;
        },
        error => {
          errorHandler(error);
        },
      );
    },
    [errorHandler, fetchClient, getAnketa, setErrorState],
  );

  const archivingAnketa = useCallback(
    (step: TAnketaStep) => {
      setState({status: 'pending'});
      fetchClient(`${BASE_URL}/archive-app`, {body: step}).then(
        data => {
          setState({status: 'resolved'});
          getAnketa();
          return data;
        },
        error => errorHandler(error),
      );
    },
    [errorHandler, fetchClient, getAnketa],
  );

  const refusePhotoPassport = useCallback(async () => {
    setState({status: 'pending'});
    fetchClient(`${BASE_URL}/update-session-app-refuse-upload-passport-photo`, {body: {}}).then(
      data => {
        setState({status: 'resolved'});
        getAnketa();
        return data;
      },
      error => errorHandler(error),
    );
  }, [errorHandler, fetchClient, getAnketa]);


  return {
    getAnketa,
    updateAnketa,
    archivingAnketa,
    refusePhotoPassport,
    verifySignature,
    data,
    status,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
  };
}
