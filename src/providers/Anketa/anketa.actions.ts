import { DataService, auditService } from 'services';
import { errorHandler } from 'hooks';
import { anketaUpdateAPI, anketaAPI } from './anketa.api';
import { IAnketa, TAnketaStatus, IAnketaActions, TContacts } from './types';

const makeRequest = (url: string, request = {}) => {
  const dataService = new DataService(url).setMethod('POST');
  const response = dataService.createRequest(request);
  return response;
};

export const getAnketaState = async (dispatch: React.Dispatch<IAnketaActions>) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const { data } = await makeRequest(anketaAPI.GET_STATUS);
    dispatch({ type: 'IS_SUCCESS', payload: data, status: data.status });
  } catch (error) {
    const errorState = errorHandler(error);
    dispatch({ type: 'IS_FAILURE', payload: errorState });
  }
};

const handleError = (dispatch: React.Dispatch<IAnketaActions>, error: any) => {
  // TODO: handle 401 - 409 code
  const errorState = errorHandler(error);
  dispatch({ type: 'IS_FAILURE', payload: errorState });
};

export const updateAnketa = async (
  dispatch: React.Dispatch<IAnketaActions>,
  status: TAnketaStatus,
  anketaData: Partial<IAnketa>
) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const { data } = await makeRequest(anketaUpdateAPI[status], anketaData);
    if (data.code === 'OK') {
      dispatch({ type: 'IS_SUCCESS' });
      auditService.userEvent({ category: 'Anketa', action: `${status} OK` });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
    auditService.userEvent({ category: 'Anketa', action: `${status} FAIL` });
  }
};

export const signAgreement = async (dispatch: React.Dispatch<IAnketaActions>, signData: TContacts) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const response = await makeRequest(anketaAPI.SIGN_AGREEMENT, signData);
    if (response.status === 200) {
      dispatch({ type: 'IS_SUCCESS' });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const verifySignature = async (
  dispatch: React.Dispatch<IAnketaActions>,
  code: { verificationCode: string }
) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const response = await makeRequest(anketaAPI.VERIFY_AGREEMENT, code);
    if (response.status === 200) {
      dispatch({
        type: 'IS_SUCCESS',
        payload: { agreementSignatureIsVerified: response.data.verified },
      });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const documentsSigning = async (dispatch: React.Dispatch<IAnketaActions>, isSigned: boolean) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const { data } = await makeRequest(anketaAPI.SIGN_DOCUMENTS, { flag: isSigned });
    if (data.code === 'OK') {
      dispatch({ type: 'IS_SUCCESS' });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const documentsVerifySignature = async (
  dispatch: React.Dispatch<IAnketaActions>,
  code: { code: string }
) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const response = await makeRequest(anketaAPI.DOCUMENTS_VERIFY_SIGNATURE, code);
    if (response.data.code === 'OK') {
      dispatch({
        type: 'IS_SUCCESS',
        payload: { documentsSignatureIsVerified: response.data.code === 'OK' },
      });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const getCustomerCards = async (dispatch: React.Dispatch<IAnketaActions>) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const response = await makeRequest(anketaAPI.CUSTOMER_CARDS);

    if (response.status === 200) {
      dispatch({
        type: 'IS_SUCCESS',
        payload: { customerOtpCards: response.data.customerOtpCards || [] },
      });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const sendCustomerCard = async (
  dispatch: React.Dispatch<IAnketaActions>,
  cardNumber: string,
  cardExpirationDate: string
) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const response = await makeRequest(anketaAPI.CARD_TRANSFER_DETAILS, {
      cardNumber,
      cardExpirationDate,
    });
    if (response.status === 200) {
      dispatch({ type: 'IS_SUCCESS' });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const archivingAnketa = async (dispatch: React.Dispatch<IAnketaActions>) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const { data } = await makeRequest(anketaAPI.ARCHIVING, status);
    if (data.code === 'OK') {
      dispatch({ type: 'IS_SUCCESS' });
      auditService.userEvent({ category: 'Anketa', action: 'Anketa archived' });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
    auditService.userEvent({ category: 'Anketa', action: 'Anketa not archived' });
  }
};

export const refusePhotoPassport = async (dispatch: React.Dispatch<IAnketaActions>) => {
  dispatch({ type: 'IS_FETCHING' });
  try {
    const { data } = await makeRequest(anketaAPI.PHOTO_REFUSE);
    if (data.code === 'OK') {
      dispatch({ type: 'IS_SUCCESS' });
      auditService.userEvent({ category: 'Anketa', action: 'Photo refused' });
      getAnketaState(dispatch);
    }
  } catch (error) {
    handleError(dispatch, error);
    auditService.userEvent({ category: 'Anketa', action: 'Error on photo refusing' });
  }
};
