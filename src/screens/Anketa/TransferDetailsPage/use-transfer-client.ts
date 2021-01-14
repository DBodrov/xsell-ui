import React from 'react';
import {TCustomerCard} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';

type State = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  cards?: TCustomerCard[];
  error?: any;
};

export function useTransferClient() {
  const fetchClient = useFetch();
  const [{status, cards}, dispatch] = React.useReducer(
    (state: State, changes: State) => ({...state, ...changes}),
    {status: 'idle', cards: undefined, error: undefined},
  );

  const fetchOTPCards = React.useCallback(() => {
    dispatch({status: 'pending', error: undefined});
    fetchClient('/gateway/customer-profile/get-otp-cards', {method: 'POST'}).then(
      response => {
        const customerCards = response.customerOtpCards;
        dispatch({status: 'resolved', cards: customerCards});
        return response;
      },
      error => {
        dispatch({status: 'rejected', error})
        return error;
      },
    );
  }, [fetchClient]);

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isSuccess: status === 'resolved',
    isError: status === 'rejected',
    cards,
    fetchOTPCards

  }
}
