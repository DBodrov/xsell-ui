import React from 'react';
import {Spinner} from 'components/lib';
import {useAnketa} from 'context/Anketa';
import {TransferCardPage} from '../TransferCardPage';
import {TransferAccountPage} from '../TransferAccountPage';
import {TransferSBPPage} from '../TransferSBPPage';
import {useTransferClient} from './use-transfer-client';

export function TransferDetailsPage() {
  const {anketa} = useAnketa();
  const {cards, isSuccess, isIdle, isLoading, isError, fetchOTPCards} = useTransferClient();
  const [page, setPage] = React.useState('default');

  const hasCards = cards?.length > 0;
  const hasDbo = anketa?.dboActivated;

  React.useEffect(() => {
    if (!cards && !isSuccess && !isError) {
      fetchOTPCards();
    }
    if (anketa && isSuccess) {
      let currentPage = 'default';
      if (!hasCards && !hasDbo) {
        currentPage = 'account';
      } else if (hasDbo) {
        currentPage = 'sbp';
      } else if (hasCards && !hasDbo) {
        currentPage = 'cards'
      }
      setPage(currentPage);
    }
  }, [anketa, cards, fetchOTPCards, hasCards, hasDbo, isError, isSuccess]);

  if (isIdle || isLoading) {
    return <Spinner withBackdrop message="Обновляем анкету..." />;
  }

  if (page === 'account') {
    return <TransferAccountPage />
  }

  if (page === 'cards') {
    return <TransferCardPage cards={cards} hasDbo={hasDbo} onChangePage={setPage}/>
  }

  if (page === 'sbp') {
    return <TransferSBPPage onChangePage={setPage} hasCards={hasCards} />
  }

  return <span>fallback page</span>


}
