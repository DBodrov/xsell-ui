import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForElementToBeRemoved,
  waitForLoadingFinish,
} from 'utils/test-utils';

const setupServer = () => {
  server.use(
    rest.post('/gateway/auth-status', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.cookie('userData', '__encoded__user__data__'),
        ctx.json({
          status: 'AUTH2_REQUIRED',
        }),
      );
    }),
  );
};

test('re-send sms', async () => {
  jest.useFakeTimers();
  setupServer();
  renderApp();
  await waitForLoadingFinish();
  const waitingLinkMessage = screen.queryByText(/Повторный запрос возможен через/i);
  expect(waitingLinkMessage).toBeInTheDocument();
  const smsLink = await screen.findByText(/Отправить СМС повторно/i, {}, {timeout: 10000});
  expect(smsLink).toBeInTheDocument();
  userEvent.click(smsLink);
  expect(await screen.findByText(/Повторный запрос возможен через/i)).toBeInTheDocument();
});

test('auth2 happy path', async () => {
  jest.useFakeTimers();
  setupServer();
  renderApp();
  await waitForLoadingFinish();
  expect(screen.queryByRole('textbox')).toBeInTheDocument();
  await userEvent.type(screen.queryByPlaceholderText(/Введите код/i), '1234');
  await waitForElementToBeRemoved(() => screen.queryByPlaceholderText(/Введите код/i), {timeout: 5000});
  await waitForLoadingFinish();
  //jest.runAllTimers();
  expect(screen.queryByText(/обновляем анкету/i)).toBeInTheDocument();
});
