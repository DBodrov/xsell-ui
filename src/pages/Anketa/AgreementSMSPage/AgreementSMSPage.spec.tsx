import React from 'react';
import { cleanup } from '@testing-library/react';
import { withAnketaProvider } from 'providers';
import { AgreementPage } from './AgreementPage';

afterEach(cleanup);

describe.skip('*** Anketa / AgreementPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<AgreementPage />);
    getByText(/Согласие на запрос кредитной истории/i);
  });
});
