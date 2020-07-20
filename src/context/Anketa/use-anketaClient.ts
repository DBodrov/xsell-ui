import { useCallback, useReducer } from 'react';
import { useFetch } from 'utils/use-fetch';
import { useError, ErrorState } from '../Error';
import { IAnketaState, TAnketaStep, IAnketa } from './types';

const BASE_URL = '/gateway/credit-application';
const PROFILE_URL = '/gateway/customer-profile';

export const anketaUpdateAPI: Partial<Record<TAnketaStep | string, string>> = {
  LOAN_PARAMS: `${BASE_URL}/update-session-app-loan-params`,
  PASSPORT: `${BASE_URL}/update-session-app-passport`,
  REGISTRATION_ADDRESS: `${BASE_URL}/update-session-app-registration-address`,
  DETAILS: `${BASE_URL}/submit-form`,
  PASSPORT_PHOTO: `${BASE_URL}/update-session-app-confirm-upload-passport-photo`,
  // DETAILS: `${BASE_URL}/update-session-app-details`,
  // PROCESSING_AGREEMENT: `${BASE_URL}/sign-agreement`,
  TRANSFER_DETAILS: `${BASE_URL}/update-session-app-account-transfer-details`,
  TRANSFER_DETAILS_CARDS: `${BASE_URL}/update-session-app-card-transfer-details`,
  AGREEMENT_SMS_CODE: `${BASE_URL}/verify-agreement-signature`,
  APPROVED: `${BASE_URL}/agree-to-sign-documents`,
  // TRANSFER_CHOSEN: `/anketa/transferchosen`,
  // PENDING_SCORING: `/anketa/pendingscoring`,
  // PENDING_ADVANCE_SCORING: `/anketa/pendingscoring`,
  // ADVANCE_SCORING_REFUSAL: `/anketa/scoringrefusal`,
  // SCORING: `/anketa/pendingscoring`,
  // SIGNATURE_SMS_CODE: `/anketa/signaturesms`,
  // PENDING_DOCUMENTS: `/anketa/pendingdocuments`,
  // EXECUTION: `/anketa/executing`,
  // COMPLETED: `/anketa/completed`,
};

const initialAnketaState: IAnketaState = { status: 'idle', data: { anketa: null, step: null } };
const anketaReducer = (s: IAnketaState, a: IAnketaState) => ({ ...s, ...a });

export function useAnketaClient() {
  const [{ status, data }, setState] = useReducer(anketaReducer, initialAnketaState);
  const fetchClient = useFetch();
  const { setErrorState } = useError();

  const errorHandler = useCallback(
    (error: ErrorState | any) => {
      // console.log(error);
      setState({ status: 'rejected' });
      setErrorState(error);
      return error;
    },
    [setErrorState]
  );

  const getAnketa = useCallback(() => {
    setState({ status: 'pending' });
    fetchClient(`${BASE_URL}/get-session-app`, { body: {} }).then(
      (response) => {
        const { status, ...restData } = response;
        setState({ status: 'resolved', data: { step: status, anketa: { ...restData } } });
        return response;
      },
      (error) => errorHandler(error)
    );
  }, [errorHandler, fetchClient]);

  const updateAnketa = useCallback(
    (step: TAnketaStep, anketa: Partial<IAnketa> | Record<string, unknown>) => {
      //console.log('update anketa', step, anketa);
      setState({ status: 'pending' });
      setErrorState(undefined);
      fetchClient(anketaUpdateAPI[step], { body: anketa }).then(
        (data) => {
          // console.log(data);
          setState({ status: 'resolved' });
          getAnketa();
          return data;
        },
        (error) => {
          // console.log(error);
          errorHandler(error);
          // return error;
        }
      );
    },
    [errorHandler, fetchClient, getAnketa, setErrorState]
  );

  const verifySignature = useCallback(
    (step: string, payload: Record<string, unknown>) => {
      setState({ status: 'pending' });
      setErrorState(undefined);
      fetchClient(anketaUpdateAPI[step], { body: payload }).then(
        (response) => {
          if (response.verified) {
            setState({ status: 'resolved' });
            getAnketa();
          } else {
            setState({ status: 'rejected' });
            setErrorState({
              status: 400,
              message: 'Неверный код. Чтобы продолжить оформление кредита введите корректный код из СМС',
            });
          }
          return response;
        },
        (error) => {
          errorHandler(error);
        }
      );
    },
    [errorHandler, fetchClient, getAnketa, setErrorState]
  );

  const archivingAnketa = useCallback(
    (step: TAnketaStep) => {
      setState({ status: 'pending' });
      fetchClient(`${BASE_URL}/archive-app`, { body: step }).then(
        (data) => {
          setState({ status: 'resolved' });
          getAnketa();
          return data;
        },
        (error) => errorHandler(error)
      );
    },
    [errorHandler, fetchClient, getAnketa]
  );

  const refusePhotoPassport = useCallback(async () => {
    setState({ status: 'pending' });
    fetchClient(`${BASE_URL}/update-session-app-refuse-upload-passport-photo`, { body: {} }).then(
      (data) => {
        setState({ status: 'resolved' });
        getAnketa();
        return data;
      },
      (error) => errorHandler(error)
    );
  }, [errorHandler, fetchClient, getAnketa]);

  const fetchCustomerCards = useCallback(() => {
    setState({ status: 'pending' });
    fetchClient(`${PROFILE_URL}/get-otp-cards`, { body: {} }).then(
      (response) => {
        if ('customerOtpCards' in response) {
          setState({
            status: 'resolved',
            data: {
              ...data,
              anketa: { ...data.anketa, customerOtpCards: response?.customerOtpCards },
            },
          });
        } else {
          setState({
            status: 'resolved',
            data: { anketa: { ...data.anketa, customerOtpCards: [] } },
          });
        }
        // console.log(response);
        return response;
      },
      (error) => errorHandler(error)
    );
  }, [data, errorHandler, fetchClient]);

  return {
    getAnketa,
    updateAnketa,
    archivingAnketa,
    refusePhotoPassport,
    verifySignature,
    fetchCustomerCards,
    data,
    status,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
  };
}
