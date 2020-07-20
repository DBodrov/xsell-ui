import { useDataApi } from 'hooks';
import { IPageHook, IDocsSend } from 'typings';

export function useSendDocs(): IPageHook<IDocsSend> {
  const { performRequest, state } = useDataApi();

  const sendDocs = (details: IDocsSend) => {
    const url = '/gateway/credit-application/send-documents';
    performRequest({ url, body: details });
  };

  return { submitForm: sendDocs, pageState: state };
}
