import React, {useContext, createContext, useMemo, useEffect} from 'react';
import {Spinner} from 'components/lib';
import {useAnketaClient} from './use-anketaClient';
import {TAnketaContext} from './types';

export const AnketaContext = createContext<TAnketaContext | undefined>(undefined);

export function AnketaProvider({children}: any) {
  const {
    getAnketa,
    data,
    isIdle,
    isLoading,
    updateAnketa,
    archivingAnketa,
    refusePhotoPassport,
    verifySignature,
  } = useAnketaClient();

  useEffect(() => {
    getAnketa();
  }, [getAnketa]);

  const contextValue = useMemo<TAnketaContext>(
    () => ({
      anketa: data?.anketa,
      step: data?.step,
      updateAnketa,
      archivingAnketa,
      refusePhotoPassport,
      verifySignature,
    }),
    [archivingAnketa, data, refusePhotoPassport, updateAnketa, verifySignature],
  );

  if (isIdle || isLoading) {
    return <Spinner withBackdrop message="Обновляем анкету..." />;
  }

  return <AnketaContext.Provider value={contextValue}>{children}</AnketaContext.Provider>;
}

export function useAnketa() {
  const context = useContext(AnketaContext);
  if (!context) {
    throw new Error('useAnketa must be used within a AnketaProvider');
  }
  return context;
}
