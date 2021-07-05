import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
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
