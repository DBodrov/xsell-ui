import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { TransferPage } from './TransferPage';

afterEach(cleanup);

describe('*** Anketa / TransferChoice ***', () => {
  test('should render TransferChoice', async () => {
    const { container } = withAnketaProvider(<TransferPage />, {}, {}, jest.fn());

    const page = container.querySelector('.Page');
    expect(page).toBeInTheDocument();
  });
});
