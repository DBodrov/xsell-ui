import React, { useEffect, useState } from 'react';
import { useAnketa } from 'context/Anketa';
import { TransferCardPage } from '../TransferCardPage';
import { AccountPage } from '../AccountPage';

export function TransferPage() {
  const [isShowAccountPage, changeView] = useState(false);
  const { anketa, fetchCustomerCards } = useAnketa();

  useEffect(() => {
    if (!anketa.customerOtpCards) {
      fetchCustomerCards();
    }
  }, [anketa, fetchCustomerCards]);

  if (anketa?.customerOtpCards?.length === 0 || isShowAccountPage) {
    return <AccountPage />;
  }
  if (anketa?.customerOtpCards?.length > 0) {
    return <TransferCardPage onChangeView={changeView} />;
  }
  return null;
}
