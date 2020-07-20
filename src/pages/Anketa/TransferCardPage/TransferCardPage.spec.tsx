import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { TransferCardPage } from './TransferCardPage';

afterEach(cleanup);

describe('*** Anketa / Transfer Card ***', () => {
  test('should render TransferCard', async () => {
    const { getByText } = withAnketaProvider(<TransferCardPage />);
    getByText(/НА СУЩЕСТВУЮЩУЮ КАРТУ/i);
  });
});
