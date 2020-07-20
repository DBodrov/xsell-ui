import { useCallback, useState } from 'react';
import { useFetch } from 'utils/use-fetch';
import { TLoanParams } from './CalcAmountForm';

export function usePayment(isStaff = false) {
  const [payment, setPayment] = useState(null);
  const fetchClient = useFetch();

  const updateLoanParams = useCallback(
    (calcData: Partial<TLoanParams>) => {
      const clientUrl = '/gateway/credit-application/get-monthly-payment';
      const staffUrl = '/gateway/credit-application/get-employee-monthly-payment';
      const url = isStaff ? staffUrl : clientUrl;
      fetchClient(url, { body: calcData }).then(
        (data) => {
          setPayment(data?.monthlyPayment);
          return data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    [fetchClient, isStaff]
  );

  return { updateLoanParams, payment };
}
