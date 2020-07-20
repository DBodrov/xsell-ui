import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { TransferForm } from './TransferForm';

afterEach(cleanup);

const handleSaveContactsMock = jest.fn();

test('Transfer Form', () => {
  const { getByText } = render(<TransferForm onSave={handleSaveContactsMock} />);
  const confirmButton = getByText('Далее');

  fireEvent.submit(confirmButton);

  expect(handleSaveContactsMock).toHaveBeenCalledTimes(0);
  // expect(handleSaveContactsMock).toHaveBeenCalledWith(mockData);
});
