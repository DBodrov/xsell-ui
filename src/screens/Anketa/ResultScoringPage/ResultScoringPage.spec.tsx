import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { ResultScoringPage } from './ResultScoringPage';

afterEach(cleanup);

const setup = () => withAnketaProvider(<ResultScoringPage />);

describe('*** Anketa / ResultScoringPage ***', () => {
  test('should render ResultScoringPage', async () => {
    const { container, getByTestId, getByText } = setup();
    const page = container.querySelector('.ResultScoringPage');
    expect(page).toBeInTheDocument();
    const checkBox = getByTestId('checkbox');
    expect(checkBox).toBeInTheDocument();
    const confirmButton = getByText('Подписать');
    expect(confirmButton).toBeInTheDocument();
  });

  test('should confirm button is disabled by default', () => {
    const { getByText } = setup();
    const confirmButton = getByText('Подписать');
    // expect(confirmButton).toHaveAttribute('disabled');
    expect(confirmButton).toBeDisabled();
  });

  test('should confirm button enabled when form is valid', () => {
    const { getByTestId, getByText } = setup();
    const checkBox = getByTestId('checkbox');
    const confirmButton = getByText('Подписать');

    fireEvent.click(checkBox);
    expect(confirmButton).not.toBeDisabled();
  });
});
