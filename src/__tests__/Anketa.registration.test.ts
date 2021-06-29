import {server, rest, statusHandler, anketaHandler} from 'src/test/test-server';
import {anketa} from 'context/__mocks__/anketa-mock';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
  act,
  fireEvent
} from 'utils/test-utils';

test('render Jobinfo screen', async () => {
  server.use(statusHandler('OK'), anketaHandler('REGISTRATION_ADDRESS'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Проверьте свои данные/i)).toBeInTheDocument();
  expect(screen.queryByText(anketa.registrationAddress)).toBeInTheDocument();
});

test.skip('address was changed', async () => {
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
      const registrationStep = {...anketa, status: 'REGISTRATION_ADDRESS'};
      return res(ctx.status(200), ctx.json(registrationStep));
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

test('fill form', async () => {
  server.use(statusHandler('OK'), anketaHandler('REGISTRATION_ADDRESS'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();

  const submitButton = screen.queryByRole('button', {name: 'Все данные верны'});
  expect(submitButton).toBeDisabled();

  const innField = screen.queryByLabelText(/ИНН работодателя/i);
  expect(innField).toBeInTheDocument();

  userEvent.type(innField, '123456789012');
  expect(innField).toHaveValue('123456789012');

  const workPlace = screen.queryByLabelText(/Место работы/i);
  userEvent.type(workPlace, 'рога и копыта');
  expect(workPlace).toHaveValue('рога и копыта');
  await act(() => Promise.resolve());

  const monthlyAmount = screen.queryByLabelText(/Весь ежемесячный доход/i);
  userEvent.type(monthlyAmount, '10000');
  await act(() => Promise.resolve());

  const workExperience = screen.queryByLabelText(/Стаж на последнем месте/i);
  userEvent.type(workExperience, '10');
  await act(() => Promise.resolve());

  const industry = screen.queryByLabelText(/Отрасль занятости/i);
  fireEvent.click(industry);
  const industryItem = await screen.findByText('Энергетика');
  fireEvent.click(industryItem);
  expect(industry).toHaveValue('Энергетика');
  await act(() => Promise.resolve());
  const additionalPhone = screen.queryByLabelText(/дополнительный мобильный телефон/i);
  userEvent.type(additionalPhone, '8007772233');
  await act(() => Promise.resolve());

  screen.queryAllByRole('checkbox').forEach(checkbox => {
    fireEvent.click(checkbox);
  })

  await act(() => Promise.resolve());

  expect(submitButton).not.toBeDisabled();
});
