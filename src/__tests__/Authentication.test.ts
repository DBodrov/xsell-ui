import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForElementToBeRemoved,
} from 'utils/test-utils';
import {AuthStatus} from 'context/Auth';
import {LandingProps} from '../screens/Landing/types';

jest.setTimeout(30000);

const landing1 = 'https://cash.otpbank.ru/public/images/girl.png';
const landing2 = 'https://cash.otpbank.ru/public/images/family.png';
const landing3 = 'https://cash.otpbank.ru/public/images/girl3a.png';
const landing4 = 'https://cash.otpbank.ru/public/images/girl_4.png';

const appSetup = (status: AuthStatus) => {
  server.use(
    rest.post('/gateway/auth-status', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({status}));
    }),
  );

  return renderApp();
};

type TInitSessionResponse = {
  sessionStatus?: AuthStatus;
  settings?: {landingCode?: string};
};
const initSession = ({sessionStatus, settings}: TInitSessionResponse) => {
  server.use(
    rest.post('/gateway/initialize', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({sessionStatus, settings}));
    }),
  );

  return renderApp();
};

test('render default - Landing1', async () => {
  appSetup('INITIALIZE');
  await waitForLoadingFinish();
  expect(screen.queryByText('Кредит наличными')).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Получить онлайн/i})).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Не интересно/i})).toBeInTheDocument();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing1);
});

const renderLandings = (landingCode: LandingProps['landingCode']) =>
  initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {landingCode}});

test('render Landing1', async () => {
  renderLandings('LANDING_TEST_1');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing1);
});

test('render Landing2', async () => {
  renderLandings('LANDING_TEST_2');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing2);
});

test('render Landing3', async () => {
  renderLandings('LANDING_TEST_3');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing3);
});

test('render Landing4', async () => {
  renderLandings('LANDING_TEST_4');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing4);
});

test('handle get app status fail', async () => {
  jest.useFakeTimers();
  server.use(
    rest.post('/gateway/auth-status', (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({
          code: 'Error',
        }),
      );
    }),
  );

  renderApp();
  await waitForLoadingFinish();
  expect(screen.queryByText(/Что-то пошло не так/i)).toBeInTheDocument();
});

describe.skip('Auth1 tests', () => {
  test('handle initialize fail', async () => {
    //jest.useFakeTimers();
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.cookie('userData', '', {maxAge: -1}),
          ctx.json({
            status: 'INITIALIZE',
          }),
        );
      }),
    );
    server.use(
      rest.post('/gateway/initialize', (req, res, ctx) => {
        return res.once(ctx.status(500));
      }),
    );
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByText(/Что-то пошло не так/i)).toBeInTheDocument();
  });

  test('unknown client auth1 login - happy path', async () => {
    initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {}});
    await waitForLoadingFinish();
    const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    const formHeader = await screen.findByText(/Введите телефон/);
    expect(formHeader).toBeInTheDocument();
    const phoneNumber = screen.queryByLabelText(/мобильный/i);
    await userEvent.type(phoneNumber, '8001234567');
    const birthDate = screen.queryByLabelText(/picker-input/i);
    await userEvent.type(birthDate, '21091975');
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach(checkbox => userEvent.click(checkbox));
    const submitButton = screen.queryByText('Продолжить');
    userEvent.click(submitButton);
    await waitForLoadingFinish();
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
  });

  test.skip('unknown client - not found', async () => {
    server.use(
      rest.post('/gateway/auth1', (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.json({
            verified: false,
            passwordLength: 0,
            passwordLifetimeInSeconds: 0,
            sessionStatus: 'AUTH1_REQUIRED',
          }),
        );
      }),
    );
    initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {}});
    await waitForLoadingFinish();
    const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    const formHeader = await screen.findByText(/Введите телефон/);
    expect(formHeader).toBeInTheDocument();
    const phoneNumber = screen.queryByLabelText(/мобильный/i);
    await userEvent.type(phoneNumber, '8001234567');
    const birthDate = screen.queryByLabelText(/picker-input/i);
    await userEvent.type(birthDate, '21091975');
    // screen.debug(birthDate)
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach(checkbox => userEvent.click(checkbox));
    const submitButton = screen.queryByText('Продолжить');
    userEvent.click(submitButton);
    await waitForLoadingFinish();
    const PageTitle = await screen.findByText(/Не можем вас найти/i);
    expect(PageTitle).toBeInTheDocument();
  });
});

describe('client login flow', () => {
  test.skip('client jump to sms from landing', async () => {
    renderLandings('LANDING_TEST_1');
    await waitForLoadingFinish();
    const nextPageButton = screen.queryByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    await waitForLoadingFinish();
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
  });

  test.skip('second enter', async () => {
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.cookie('userData', '__encoded__user__data__'),
          ctx.json({
            status: 'AUTH1_REQUIRED',
          }),
        );
      }),
    );
    //jest.useFakeTimers();
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByText(/мы завершили ваш сеанс/i)).toBeInTheDocument();
    const continueButton = screen.queryByRole('button', {name: /Продолжить/i});
    screen.debug(continueButton);
    userEvent.click(continueButton);
    await waitForLoadingFinish();
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
    await userEvent.type(screen.queryByPlaceholderText(/Введите код/i), '1234');
    await waitForElementToBeRemoved(() => screen.queryByPlaceholderText(/Введите код/i), {timeout: 8000});
    await waitForLoadingFinish();
    //jest.runAllTimers();
    expect(screen.queryByText(/обновляем анкету/i)).toBeInTheDocument();
  });
});
