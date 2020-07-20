import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TransferChoice } from './TransferChoice';

afterEach(cleanup);

const setup = () =>
  render(
    <MemoryRouter initialEntries={['/anketa/transferdetails']}>
      <TransferChoice />
    </MemoryRouter>
  );

describe('*** Anketa / TransferChoice ***', () => {
  test('should render TransferChoice', async () => {
    const { getByText } = setup();
    getByText(/Выберите удобный для вас способ получения денег/i);
  });
});
