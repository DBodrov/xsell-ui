import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { PassportPage } from './PassportPage';

afterEach(cleanup);

describe('**** Anketa /  PassportPage ****', () => {
  test('should render Page', () => {
    const { getByText } = withAnketaProvider(<PassportPage />, {
      anketa: { passportSeries: '1234', passportNumber: '567890' } as IAnketa,
    });
    getByText(/Введите паспорт/i);
  });
});
