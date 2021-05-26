import { useCallback, useState, useMemo } from 'react';
import { useFetch } from 'utils/use-fetch';
import { TLoanParams, TPaymentValues } from './types';

export function usePayment(isStaff = false) {
  const [payment, setPayment] = useState<TPaymentValues | null>(null);
  const fetchClient = useFetch();

  const updateLoanParams = useCallback(
    (calcData: Partial<TLoanParams>) => {
      const clientUrl = '/gateway/credit-application/get-monthly-payment';
      const staffUrl = '/gateway/credit-application/get-employee-monthly-payment';
      const url = isStaff ? staffUrl : clientUrl;
      fetchClient(url, { body: calcData }).then(
        (data : TPaymentValues) => {
          setPayment(data);
          return data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    [fetchClient, isStaff]
  );

  return { updateLoanParams, payment: useMemo(() => (payment), [payment]) };
}
