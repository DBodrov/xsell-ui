import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { PendingScoringPage } from './PendingScoringPage';

afterEach(cleanup);

describe('*** Anketa / PendingScoringPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<PendingScoringPage />);
    getByText(/Ваша заявка в обработке/i);
  });
});
