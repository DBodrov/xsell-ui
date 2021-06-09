import {useCallback, useState} from 'react';
import {useFetch} from 'utils/use-fetch';
import {TLoanParams} from './CalcAmountForm';
import {TPaymentValues} from './types';

export function usePayment(isStaff = false, isFap = false) {
  const [payment, setPayment] = useState<TPaymentValues | null>(null);
  const fetchClient = useFetch();

  const updateLoanParams = useCallback(
    (calcData: Partial<TLoanParams>) => {
      const clientUrl = '/gateway/credit-application/get-monthly-payment';
      const staffUrl = '/gateway/credit-application/get-employee-monthly-payment';
      const fapUrl = '/get-monthly-payment-with-campaign';
      const url = isStaff ? staffUrl : isFap ? fapUrl : clientUrl;
      fetchClient(url, {body: calcData}).then(
        (data: TPaymentValues) => {
          setPayment(data);
          return data;
        },
        error => {
          console.error(error);
        },
      );
    },
    [fetchClient, isFap, isStaff],
  );

  return {updateLoanParams, payment};
}
