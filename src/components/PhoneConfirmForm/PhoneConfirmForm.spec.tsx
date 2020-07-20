import React from 'react';
import { wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PhoneConfirmForm } from './PhoneConfirmForm';
import { withAnketaProvider } from 'providers';

const mockHandleAuth2SignIn = jest.fn();

const setup = () => {
  const utils = withAnketaProvider(<PhoneConfirmForm />, {}, { handleAuth2SignIn: mockHandleAuth2SignIn });

  const input = utils.getByPlaceholderText(/введите код/i);
  return {
    ...utils,
    input,
  };
};
jest.setTimeout(10000);
afterEach(jest.clearAllTimers);

describe('*** Auth / PhoneConfirmForm ***', () => {
  test('submit sms code', async () => {
    const { input, getByText } = setup();
    expect(input).toBeInTheDocument();
    const waitMessage = getByText(/Повторный запрос возможен через/i);
    expect(waitMessage).toBeInTheDocument();
    const smsLink = await wait(() => getByText(/Отправить СМС повторно/i), { timeout: 10000 });
    expect(smsLink).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 1234 } });
    await wait(
      () => {
        expect(mockHandleAuth2SignIn).toBeCalledTimes(1);
        expect(mockHandleAuth2SignIn).toBeCalledWith('1234', '');
      },
      { timeout: 500 }
    );
  });
});
