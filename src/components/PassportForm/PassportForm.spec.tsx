import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PassportForm } from './PassportForm';

afterEach(cleanup);

const passportMock = '1234567890';

const onChangePassportMock = jest.fn();
const onArchivingAnketaMock = jest.fn();
const onSubmitMock = jest.fn();
const valueMock = '';

test('render passport page', () => {
  const { getByText, getByTestId } = render(
    <PassportForm
      formIsValid
      onChangePassport={onChangePassportMock}
      onSubmitPassport={onSubmitMock}
      hasError={false}
      onArchivingAnketa={onArchivingAnketaMock}
      value={valueMock}
    />
  );
  // getByText('Введите паспорт');
  // container.getElementsByTagName('form');
  const passportInput = getByTestId('passport-input');
  const submitButton = getByText('Отправить данные паспорта');
  fireEvent.change(passportInput, { target: { value: passportMock } });
  fireEvent.submit(submitButton);
  // expect(submitButton).not.toHaveAttribute('disabled');
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
});
