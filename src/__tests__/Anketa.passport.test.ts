import {server, statusHandler, anketaHandler} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
} from 'utils/test-utils';


test('render Passport screen', async () => {
  server.use(statusHandler('OK'), anketaHandler('PASSPORT'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Введите паспорт/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Отправить данные паспорта/i})).toBeDisabled();
});

test('fill form field', async () => {
  server.use(statusHandler('OK'), anketaHandler('PASSPORT'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const passportField = screen.queryByLabelText(/passport/i);
  const submitButton = screen.queryByRole('button', {name: /Отправить данные паспорта/i});
  expect(passportField).toBeInTheDocument();
  userEvent.type(passportField, '1234567890');
  expect(passportField).toHaveValue('1234 567890');
  expect(submitButton).not.toBeDisabled();
})
