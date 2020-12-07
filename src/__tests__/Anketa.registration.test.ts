import {server, rest, statusHandler, anketaHandler} from 'src/test/test-server';
import {anketa} from 'context/__mocks__/anketa-mock';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
} from 'utils/test-utils';

test('render Jobinfo screen', async () => {
  server.use(statusHandler('OK'), anketaHandler('REGISTRATION_ADDRESS'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Проверьте свои данные/i)).toBeInTheDocument();
  expect(screen.queryByText(anketa.registrationAddress)).toBeInTheDocument();
});

test('address was changed', async () => {
  const statusCache = {
    cache: '',
  };
  server.use(
    statusHandler('OK'),
    rest.post('/gateway/credit-application/update-session-app-registration-address', (req, res, ctx) => {
      statusCache.cache = 'REGISTRATION_ADDRESS';
      return res(ctx.status(200), ctx.json({code: 'OK'}));
    }),
    rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
      if (statusCache.cache) {
        const updatedAnketa = {...anketa, status: 'CHANGED_REGISTRATION_ADDRESS'};
        return res(ctx.status(200), ctx.json(updatedAnketa));
      }
      return res(ctx.status(200), ctx.json(anketa));
    }),
  );
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const updateAddressButton = screen.queryByRole('button', {name: 'Обновить адрес'});
  expect(updateAddressButton).toBeInTheDocument();
  userEvent.click(updateAddressButton);
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Похоже, что место вашей прописки изменилось/i)).toBeInTheDocument();
});

test.skip('submit form', async () => {
  server.use(statusHandler('OK'), anketaHandler('REGISTRATION_ADDRESS'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const updateAddressButton = screen.queryByRole('button', {name: 'Обновить адрес'});
  expect(updateAddressButton).toBeInTheDocument();
  const innField = screen.queryByLabelText(/ИНН работодателя/i);
  expect(innField).toBeInTheDocument();
  userEvent.type(innField, '1');
  // const inputEvent = createEvent.input(innField, {target: {value: '1234567890'}})
  // fireEvent(innField, inputEvent);
  screen.debug(innField);
  expect(innField).toHaveValue('1234567890');
});