import {server, statusHandler, anketaHandler, rest} from 'src/test/test-server';
import {getAnketa} from 'context/__mocks__/anketa-mock';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
  act
} from 'utils/test-utils';

const Status = {
  current: null,
};

beforeEach(() => {
  Status.current = null;
});

test('render ResultScoring screen', async () => {
  server.use(statusHandler('OK'), anketaHandler('APPROVED'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Заявка одобрена/i)).toBeInTheDocument();
});

test('submit agreement form', async () => {
  server.use(statusHandler('OK'), anketaHandler('APPROVED'));
  server.use(
    rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
      let updatedAnketa = {...getAnketa({status: 'APPROVED'})};
      if (Status.current) {
        updatedAnketa = getAnketa({status: Status.current});
      }
      return res(ctx.status(200), ctx.json(updatedAnketa));
    }),
    rest.post('/gateway/credit-application/agree-to-sign-documents', (req, res, ctx) => {
      Status.current = 'SIGNATURE_SMS_CODE';
      return res(ctx.status(200), ctx.json({code: 'OK'}));
    }),
    );
    renderApp();
    await waitForLoadingFinish();
    await waitForAnketaLoadingFinish();
    const submitButton = screen.queryByRole('button', {name: /Подписать/i});
    expect(submitButton).toBeDisabled();
    const agreementCheckbox = screen.queryByRole('checkbox');
    userEvent.click(agreementCheckbox);
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
    await act(() => Promise.resolve());
    await waitForAnketaLoadingFinish();
    expect(screen.queryByText(/Подтверждение получения кредита/i)).toBeInTheDocument();
  });
