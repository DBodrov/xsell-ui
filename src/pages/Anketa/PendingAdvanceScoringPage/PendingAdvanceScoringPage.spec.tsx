import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { PendingAdvanceScoringPage } from './PendingAdvanceScoringPage';

afterEach(cleanup);

describe('*** Anketa / PendingScoringPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<PendingAdvanceScoringPage />);
    getByText(/Ваша заявка в обработке/i);
  });
});
