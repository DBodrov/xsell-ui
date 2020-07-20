import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { SignaturePage } from './SignaturePage';

afterEach(cleanup);

describe.skip('*** Anketa / SignaturePage ***', () => {
  test('should render SignaturePage', async () => {
    const { getByText } = withAnketaProvider(<SignaturePage />);
    getByText(/Подтверждение получения кредита/i);
  });
});
