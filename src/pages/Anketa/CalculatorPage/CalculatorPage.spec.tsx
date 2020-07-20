import React from 'react';
import { cleanup } from '@testing-library/react';
import { withAnketaProvider } from 'providers';
import { CalculatorPage } from './CalculatorPage';

afterEach(cleanup);

describe('*** Anketa /  CalculatorPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<CalculatorPage />);
    getByText(/Рассчитайте условия кредита/i);
  });
});
