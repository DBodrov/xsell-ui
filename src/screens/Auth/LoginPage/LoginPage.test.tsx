import React from 'react';

import {server, rest} from 'src/test/test-server';
import {screen, userEvent, rtlRender, waitForElementToBeRemoved} from 'utils/test-utils';
import {AuthStatus} from 'context/Auth';
import {App} from 'src/App'
import {LandingProps} from '../../Landing/types';

import {AppProviders} from 'context';

const landing1 = 'https://cash.otpbank.ru/public/images/girl.png';
const landing2 = 'https://cash.otpbank.ru/public/images/family.png';
const landing3 = 'https://cash.otpbank.ru/public/images/girl3a.png';
const landing4 = 'https://cash.otpbank.ru/public/images/girl_4.png';

const waitForLoadingFinish = () => waitForElementToBeRemoved(() => screen.queryByText(/Загрузка/i), {timeout: 5000});

const renderApp = () =>
  rtlRender(
    <AppProviders>
      <App />
    </AppProviders>,
  );

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
        ctx.json({sessionStatus, settings}));
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

test('client call auth1SignIn / jump to sms', async () => {
  renderLandings('LANDING_TEST_1');
  await waitForLoadingFinish();
  const nextPageButton = screen.getByRole('button', {name: /Получить онлайн/i});
  userEvent.click(nextPageButton);
  await waitForLoadingFinish();
  const SMSPageTitle = await screen.findByText(/Подтвердите вход/i);
  expect(SMSPageTitle).toBeInTheDocument();
});

test('render Reject modal', async () => {
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
  server.use(
    rest.post('/gateway/reject-offer', async (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderApp();
  await waitForLoadingFinish();
  const nonInterestedButton = screen.getByRole('button', {name: /Не интересно/i});
  userEvent.click(nonInterestedButton);
  const rejectModalTitle = await screen.findByText(/Почему предложение не заинтересовало/i);
  expect(rejectModalTitle).toBeInTheDocument();
});
