import React from 'react';
import {Spinner} from 'lib/components/Spinner';
import {useAnketa} from 'context/Anketa';
import {TransferCardPage} from '../TransferCardPage';
import {AccountPage} from 'pages/Anketa/AccountPage';
import {useTransferClient} from './use-transfer-client';

export function TransferDetailsPage() {
  const {anketa} = useAnketa();
  const {cards, isSuccess, isIdle, isLoading, isError, fetchOTPCards} = useTransferClient();
  const [page, setPage] = React.useState('default');

  React.useEffect(() => {
    if (!cards && !isSuccess && !isError) {
      fetchOTPCards();
    }
    if (cards && anketa && isSuccess) {
      let currentPage = 'default';
      if (cards.length === 0 && !anketa.dboActivated) {
        currentPage = 'account';
      } else if (anketa.dboActivated) {
        currentPage = 'sbp';
      } else if (cards.length > 0 && !anketa.dboActivated) {
        currentPage = 'cards'
      }
      setPage(currentPage);
    }
  }, [anketa, cards, fetchOTPCards, isError, isSuccess]);

  if (isIdle || isLoading) {
    return <Spinner withBackdrop message="Получаем данные..." />;
  }

  if (page === 'account' || page === 'default') {
    return <AccountPage />
  }

  if (page === 'cards') {
    return <TransferCardPage cards={cards} hasDbo={true}/>
  }

  if (page === 'sbp') {
    return <span>SBP page...</span>
  }

  return <span>fallback page</span>


}
