import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  // waitForElementToBeRemoved,
  waitForLoadingFinish,
} from 'utils/test-utils';
//jest.setTimeout(30000);
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
  //jest.useFakeTimers();
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

test.skip('auth2 happy path', async () => {
  /**Из за того что в MaskInput перемещается курсор программно, работу формы невозможно протестировать через Jest, т.к. в Node нет понятия курсор */
  setupServer();
  renderApp();
  await waitForLoadingFinish();
  const inputNode = screen.queryByRole('textbox');
  expect(inputNode).toBeInTheDocument();

  await userEvent.type(inputNode, '0');
  //screen.debug(inputNode);
  //await waitForElementToBeRemoved(() => inputNode, {timeout: 5000});
  // await waitForLoadingFinish();
  //jest.runAllTimers();
  //expect(screen.queryByText(/обновляем анкету/i)).toBeInTheDocument();
});
