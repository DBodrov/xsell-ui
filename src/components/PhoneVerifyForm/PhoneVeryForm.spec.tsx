import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PhoneVerifyForm } from './PhoneVerifyForm';

afterEach(cleanup);

const handleSubmitMock = jest.fn();
const handleResendMock = jest.fn();

test.skip('call submit form', () => {
  const { getByTestId } = render(
    <PhoneVerifyForm
      phone="79993334455"
      hasError={false}
      onSubmit={handleSubmitMock}
      onResend={handleResendMock}
    />
  );
  const smsCode = '0000';

  fireEvent.change(getByTestId('sms-code-input'), { target: { value: smsCode } });
  expect(handleSubmitMock).toHaveBeenCalled();
  // expect(handleSubmitMock).toHaveBeenCalledWith(smsCode);
});
