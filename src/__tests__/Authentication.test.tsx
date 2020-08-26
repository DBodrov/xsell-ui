import {server, rest} from 'src/test/test-server';
import {screen, userEvent, renderApp, waitForLoadingFinish, waitForElementToBeRemoved} from 'utils/test-utils';
import {AuthStatus} from 'context/Auth';
import {LandingProps} from '../screens/Landing/types';

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
  expect(screen.queryByAltText(/picture/i)).toHaveAttribute('src', landing1);
});

const renderLandings = (landingCode: LandingProps['landingCode']) =>
  initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {landingCode}});

test('render Landing1', async () => {
  renderLandings('LANDING_TEST_1');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/picture/i)).toHaveAttribute('src', landing1);
});

test('render Landing2', async () => {
  renderLandings('LANDING_TEST_2');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/picture/i)).toHaveAttribute('src', landing2);
});

test('render Landing3', async () => {
  renderLandings('LANDING_TEST_3');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/picture/i)).toHaveAttribute('src', landing3);
});

test('render Landing4', async () => {
  renderLandings('LANDING_TEST_4');
  await waitForLoadingFinish();
  expect(screen.queryByAltText(/landing picture/i)).toHaveAttribute('src', landing4);
});

test('non-client redirect to Login form', async () => {
  initSession({sessionStatus: 'AUTH1_REQUIRED', settings: {}});
  await waitForLoadingFinish();
  const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
  userEvent.click(nextPageButton);

  const formHeader = await screen.findByText(/Введите телефон/);
  expect(formHeader).toBeInTheDocument();
});

describe('client login flow', () => {
  test('client jump to sms from landing', async () => {
    renderLandings('LANDING_TEST_1');
    await waitForLoadingFinish();
    const nextPageButton = screen.queryByRole('button', {name: /Получить онлайн/i});
    userEvent.click(nextPageButton);
    await waitForLoadingFinish();
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
    jest.useFakeTimers();
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByText(/мы завершили ваш сеанс/i)).toBeInTheDocument();
    const continueButton = screen.queryByRole('button', {name: /Продолжить/i});
    userEvent.click(continueButton);
    await waitForLoadingFinish();
    const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
    expect(SMSPageTitle).toBeInTheDocument();
    await userEvent.type(screen.queryByPlaceholderText(/Введите код/i), '1234');
    await waitForElementToBeRemoved(() => screen.queryByPlaceholderText(/Введите код/i), {timeout: 5000})

    await waitForLoadingFinish();
    jest.runAllTimers();
    expect(screen.queryByText(/обновляем анкету/i)).toBeInTheDocument()
  });
});
