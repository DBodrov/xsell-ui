import React from 'react';
import { cleanup } from '@testing-library/react';
import { withAnketaProvider } from 'providers';
import { RejectedPage } from './RejectedPage';

afterEach(cleanup);

describe('*** Anketa / AdvanceScoringRefusalPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<RejectedPage />);
    getByText(/Ваша заявка на кредит предварительно одобрена/i);
  });
});
