import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForElementToBeRemoved,
  waitForLoadingFinish,
} from 'utils/test-utils';


describe('reject offer flow', () => {
  test('render Reject modal', async () => {
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.cookie('userData', '__encoded__user__data__', {maxAge: 0}),
          ctx.json({
            status: 'AUTH1_REQUIRED',
          }),
        );
      }),
    );
    renderApp();
    await waitForLoadingFinish();
    const nonInterestedButton = screen.getByRole('button', {name: /Не интересно/i});
    userEvent.click(nonInterestedButton);
    const rejectModal = await screen.findByRole('dialog');
    expect(rejectModal).toBeInTheDocument();
    const closeButton = screen.queryByTitle(/Закрыть/i);
    const rejectButton1 = screen.queryByRole('button', {name: /Уже взял кредит/i});
    const rejectButton2 = screen.queryByRole('button', {name: /Сейчас не интересно/i});
    const rejectButton3 = screen.queryByRole('button', {name: /Не подходят условия/i});
    userEvent.click(rejectButton1);
    expect(screen.queryByText(/Спасибо за вашу обратную связь/i)).toBeInTheDocument();
    userEvent.click(rejectButton2);
    expect(screen.queryByText(/Спасибо за вашу обратную связь/i)).toBeInTheDocument();
    userEvent.click(rejectButton3);
    expect(screen.queryByText(/Спасибо за вашу обратную связь/i)).toBeInTheDocument();
    userEvent.click(closeButton);
    await waitForElementToBeRemoved(rejectModal);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('render Reject modal without crash, when api response = Error 500', async () => {
    const handler = rest.post('/gateway/reject-offer', async (req, res, ctx) => {
      return res.once(ctx.status(400), ctx.json({message: 'Ooops!', status: 400}));
    });
    server.use(handler);
    renderApp();
    await waitForLoadingFinish();
    const nonInterestedButton = screen.getByRole('button', {name: /Не интересно/i});
    userEvent.click(nonInterestedButton);
    const rejectModalTitle = await screen.findByText(/Почему предложение не заинтересовало/i);
    expect(rejectModalTitle).toBeInTheDocument();
  });
});
