import {server, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
} from 'utils/test-utils';
import {AuthStatus} from 'context/Auth';

jest.setTimeout(30000);

const landing3 = 'https://cash.otpbank.ru/public/images/girl3a.png';

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
      return res(
        ctx.status(200),
        ctx.cookie('userData', '', {maxAge: -1}),
        ctx.cookie('SESSION', '', {maxAge: -1}),
        ctx.json({sessionStatus, settings}),
      );
    }),
  );

  return renderApp();
};

test('render default - Landing3', async () => {
  appSetup('INITIALIZE');
  await waitForLoadingFinish();
  expect(screen.queryByText('Кредит наличными')).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Получить онлайн/i})).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Не интересно/i})).toBeInTheDocument();
  expect(screen.queryByAltText(/Кредит наличными/i)).toHaveAttribute('src', landing3);
});

test('handle get app status fail - render Error page', async () => {
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

describe('AUTH1', () => {
  test('initialize fail - render Error page', async () => {
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

  test('auth1 - success', async () => {
    initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {}});
    await waitForLoadingFinish();
    const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    const formHeader = await screen.findByText(/Личные данные/);
    expect(formHeader).toBeInTheDocument();
    const phoneNumber = screen.queryByLabelText(/мобильный/i);
    userEvent.type(phoneNumber, '8001234567');
    const birthDate = screen.queryByLabelText(/дата рождения/i);
    userEvent.type(birthDate, '21091975');
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach(checkbox => userEvent.click(checkbox));
    const submitButton = screen.queryByText('Далее');
    userEvent.click(submitButton);
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
  });

  test('auth1 - client not found', async () => {
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.cookie('userData', '', {maxAge: -1}),
          ctx.json({
            status: 'AUTH1_REQUIRED',
          }),
        );
      }),
    );
    server.use(
      rest.post('/gateway/auth1', (req, res, ctx) => {
        return res(
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
    renderApp();

    await waitForLoadingFinish();
    const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    const formHeader = await screen.findByText(/Личные данные/);
    expect(formHeader).toBeInTheDocument();
    const phoneNumber = screen.queryByLabelText(/мобильный/i);
    userEvent.type(phoneNumber, '8001234567');
    const birthDate = screen.queryByLabelText(/дата рождения/i);
    userEvent.type(birthDate, '21091975');
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach(checkbox => userEvent.click(checkbox));
    const submitButton = screen.queryByText('Далее');
    userEvent.click(submitButton);
    const PageTitle = await screen.findByText(/Не можем вас найти/i);
    expect(PageTitle).toBeInTheDocument();
  });
});

describe('AUTH1 - client login flow', () => {
  test('client go to sms from landing', async () => {
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
    initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {landingCode: 'LANDING_TEST_3'}});

    await waitForLoadingFinish();
    const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
  });

  test('second enter', async () => {
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
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByText(/мы завершили ваш сеанс/i)).toBeInTheDocument();
    const continueButton = screen.queryByRole('button', {name: /Продолжить/i});
    userEvent.click(continueButton);
    await waitForLoadingFinish();
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
    userEvent.type(screen.queryByLabelText(/Введите код/i), '1234');
    screen.debug();
    expect(screen.queryByLabelText(/Введите код/i)).toHaveValue('1234');
  });
});
