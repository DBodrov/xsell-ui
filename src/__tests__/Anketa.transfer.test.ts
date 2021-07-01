import {server, statusHandler, anketaHandler} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
  act,
  waitFor,
} from 'utils/test-utils';

const account = '40817810006250000000';
const bic = '044525593';

describe('Transfer', () => {
  test('render Transfer SBP screen', async () => {

    server.use(statusHandler('OK'), anketaHandler('TRANSFER_DETAILS', {dboActivated: true}));
    renderApp();
    await waitForLoadingFinish();
    await waitForAnketaLoadingFinish();
    expect(screen.queryByText(/Перевод по номеру телефона/i)).toBeInTheDocument();
    const submitButton = screen.queryByRole('button', {name: /Далее/i});
    userEvent.click(submitButton);
    await waitFor(() => expect(screen.queryByText(/Обновляем анкету/i)).toBeInTheDocument());
    await waitForAnketaLoadingFinish();
  });

  test('Transfer Account screen', async () => {
    server.use(statusHandler('OK'), anketaHandler('TRANSFER_DETAILS', {dboActivated: true}));
    renderApp();
    await waitForLoadingFinish();
    await waitForAnketaLoadingFinish();
    expect(screen.queryByText(/Перевод по номеру телефона/i)).toBeInTheDocument();
    const accountLink = screen.queryByRole('button', {name: /Перевод на счёт в другой банк/i});
    userEvent.click(accountLink);
    await waitFor(() => expect(screen.queryByText(/Реквизиты для перевода/i)).toBeInTheDocument());
    const accountField = screen.queryByLabelText(/Ваш рублёвый счёт/i);
    const bicField = screen.queryByLabelText(/БИК вашего банка/i);
    const submitButton = screen.queryByRole('button', {name: /Далее/i});
    expect(accountField).toBeInTheDocument();
    expect(bicField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    userEvent.type(accountField, account);
    expect(accountField).toHaveValue(account);
    userEvent.type(bicField, bic);
    expect(await screen.findByText(bic)).toBeInTheDocument();
  });

  test('Transfer CardPage', async () => {
    server.use(statusHandler('OK'), anketaHandler('TRANSFER_DETAILS', {dboActivated: true}));
    renderApp();
    await waitForLoadingFinish();
    await waitForAnketaLoadingFinish();
    expect(screen.queryByText(/Перевод по номеру телефона/i)).toBeInTheDocument();
    const cardLink = screen.queryByRole('button', {name: /Перевод на карту/i});
    userEvent.click(cardLink);
    expect(await screen.findByText(/Способ получения денег на карту/i)).toBeInTheDocument();
    const cardSelect = screen.queryByLabelText(/card-input/i);
    userEvent.click(cardSelect);
    await act(() => Promise.resolve());
    const cards = await screen.findAllByText(/Ваша карта/i);
    userEvent.click(cards[0]);
    await act(() => Promise.resolve());
    const submitButton = screen.queryByRole('button', {name: /Далее/i});
    userEvent.click(submitButton);
    await act(() => Promise.resolve());
    expect(screen.queryByText(/Обновляем анкету/i)).toBeInTheDocument();
  });
});
