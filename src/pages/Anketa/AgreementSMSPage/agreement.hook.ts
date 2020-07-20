import { useDataApi } from 'hooks';

export function useResend() {
  const { performRequest, state, config } = useDataApi();

  const resend = (phoneNumber: string) => {
    const url = '/gateway/credit-application/send-signature-code';
    performRequest({
      url,
      body: { phoneNumber },
    });
  };

  return { state, resend, config };
}
