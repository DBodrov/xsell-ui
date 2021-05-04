import {server, rest, statusHandler, anketaHandler} from 'src/test/test-server';
import {getAnketa} from 'context/__mocks__/anketa-mock';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
  act,
  fireEvent,
} from 'utils/test-utils';

const Status = {
  current: null,
};

beforeEach(() => {
  Status.current = null;
});

test('render Calculator screen', async () => {
  server.use(statusHandler('OK'), anketaHandler('LOAN_PARAMS'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Рассчитайте условия кредита/i)).toBeInTheDocument();
});

test('form validation', async () => {
  server.use(statusHandler('OK'), anketaHandler('LOAN_PARAMS'));
  server.use(
    rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
      let updatedAnketa = {...getAnketa({status: 'LOAN_PARAMS'})};
      if (Status.current) {
        updatedAnketa = getAnketa({status: Status.current});
      }
      return res(ctx.status(200), ctx.json(updatedAnketa));
    }),
    rest.post('/gateway/credit-application/update-session-app-loan-params', (req, res, ctx) => {
      Status.current = 'PASSPORT';
      return res(ctx.status(200), ctx.json({code: 'OK'}));
    }),
  );
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const amount = screen.queryByLabelText(/Желаемая сумма кредита/i);
  const term = screen.queryByLabelText(/Cрок кредита/i);
  (amount as HTMLInputElement).value = '';
  (term as HTMLInputElement).value = '';

  userEvent.type(amount, '3');
  fireEvent.blur(amount);
  await act(() => Promise.resolve());
  const amountError = screen.queryByText(/Введите от 30 000 до 1 000 000 рублей/i);
  expect(amountError).toBeInTheDocument();

  userEvent.type(term, '1');
  fireEvent.blur(term);
  await act(() => Promise.resolve());
  const termError = screen.queryByText(/Введите от 12 месяцев до 60 месяцев/i);
  expect(termError).toBeInTheDocument();

  (amount as HTMLInputElement).value = '';
  userEvent.type(amount, '300000');
  fireEvent.blur(amount);
  await act(() => Promise.resolve());
  expect(amountError).not.toBeInTheDocument();

  (term as HTMLInputElement).value = '';
  userEvent.type(term, '24');
  fireEvent.blur(term);
  await act(() => Promise.resolve());
  expect(termError).not.toBeInTheDocument();
  const submitButton = screen.queryByRole('button', {name: /Все данные верны/i});
  fireEvent.click(submitButton);
  await act(() => Promise.resolve());
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Введите паспорт/i)).toBeInTheDocument();
});
