import {useCallback, useState, useMemo} from 'react';
import {useFetch} from 'utils/use-fetch';
import {TPaymentValues, TPaymentRequest} from './types';

export function usePayment(isStaff = false) {
  const [payment, setPayment] = useState<TPaymentValues | null>(null);
  const fetchClient = useFetch();

  const updateLoanParams = useCallback(
    (calcData: TPaymentRequest) => {
      const url = '/gateway/credit-application/get-all-monthly-payment';
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
    [fetchClient],
  );

  return {updateLoanParams, payment: useMemo(() => payment, [payment])};
}
