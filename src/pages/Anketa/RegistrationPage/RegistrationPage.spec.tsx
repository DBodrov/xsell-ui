import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { RegistrationPage } from './RegistrationPage';

afterEach(cleanup);

describe('*** Anketa / RegistrationPage ***', () => {
  test('should render RegistrationPage', async () => {
    const { getByText } = withAnketaProvider(<RegistrationPage />);
    getByText(/Проверьте регистрацию/i);
  });
});
