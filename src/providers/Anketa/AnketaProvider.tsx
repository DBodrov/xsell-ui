import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { Spinner } from 'lib/components/Spinner';

import { IAnketaContext, IAnketaUpdatersContext, TAnketaStatus, IAnketa, TContacts } from './types';
import { initAnketaState, anketaReducer } from './anketa.reducer';
import {
  getAnketaState,
  updateAnketa,
  signAgreement,
  verifySignature,
  documentsSigning,
  documentsVerifySignature,
  getCustomerCards,
  archivingAnketa,
  sendCustomerCard,
  refusePhotoPassport,
} from './anketa.actions';

export const AnketaContext = createContext<IAnketaContext>(undefined);
export const AnketaUpdatersContext = createContext<IAnketaUpdatersContext>(undefined);

export function AnketaProvider({ children }: any) {
  const [anketaState, dispatch] = useReducer(anketaReducer, initAnketaState);

  const handleUpdateAnketa = useCallback((status: TAnketaStatus, anketaData: Partial<IAnketa>) => {
    updateAnketa(dispatch, status, anketaData);
  }, []);

  const handleSignAgreement = useCallback((signData: TContacts) => signAgreement(dispatch, signData), []);
  const handleVerifySignature = useCallback(
    (code: { verificationCode: string }) => verifySignature(dispatch, code),
    []
  );
  const handleDocumentsSigning = useCallback((isSigned: boolean) => documentsSigning(dispatch, isSigned), []);

  const handleDocumentsVerifySignature = useCallback(
    (verificationCode: { code: string }) => documentsVerifySignature(dispatch, verificationCode),
    []
  );

  const handleGetCustomerCards = useCallback(() => getCustomerCards(dispatch), []);

  const handleSendCustomerCard = useCallback(
    (cardNumber: string, cardExpirationDate: string) =>
      sendCustomerCard(dispatch, cardNumber, cardExpirationDate),
    []
  );

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(dispatch);
  }, []);

  const handlePhotoRefuse = useCallback(() => {
    refusePhotoPassport(dispatch);
  }, []);

  useEffect(() => {
    getAnketaState(dispatch);
  }, []);

  const anketaContext = useMemo<IAnketaContext>(
    () => ({
      ...anketaState,
      anketaStatus: anketaState.anketaStatus,
    }),
    [anketaState]
  );

  const anketaUpdaterContext = useMemo<IAnketaUpdatersContext>(
    () => ({
      handleUpdateAnketa,
      handleSignAgreement,
      handleVerifySignature,
      handleDocumentsSigning,
      handleDocumentsVerifySignature,
      handleGetCustomerCards,
      handleSendCustomerCard,
      handleArchivingAnketa,
      handlePhotoRefuse,
    }),
    [
      handleUpdateAnketa,
      handleSignAgreement,
      handleVerifySignature,
      handleDocumentsSigning,
      handleDocumentsVerifySignature,
      handleGetCustomerCards,
      handleSendCustomerCard,
      handleArchivingAnketa,
      handlePhotoRefuse,
    ]
  );

  return (
    <Fragment>
      {anketaState.isFetching ? (
        <Spinner withBackdrop message="Обновляем анкету..." />
      ) : (
        <AnketaContext.Provider value={anketaContext}>
          <AnketaUpdatersContext.Provider value={anketaUpdaterContext}>
            {children}
          </AnketaUpdatersContext.Provider>
        </AnketaContext.Provider>
      )}
    </Fragment>
  );
}

export const useAnketa = () => {
  const context = useContext(AnketaContext);
  if (context === undefined) {
    throw new Error('useAnketa must be used within a AnketaProvider');
  }
  return context;
};

export const useAnketaUpdaters = () => {
  const context = useContext(AnketaUpdatersContext);
  if (context === undefined) {
    throw new Error('useAnketaUpdaters must be used within a AnketaUpdatersContext.Provider');
  }
  return context;
};
