import { useDataApi } from 'hooks';

export function useResend() {
    const { performRequest, state, config } = useDataApi();

    const resend = () => {
        const url = '/gateway/send-sms';
        performRequest({ url });
    };

    return { state, resend, config };
}
