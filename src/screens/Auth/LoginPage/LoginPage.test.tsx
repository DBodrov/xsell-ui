import React from 'react';
import {render, screen} from 'utils/test-utils';
import {LoginPage} from './LoginPage';

test('render LoginPage', () => {
  render(<LoginPage />);
  expect(screen.queryByText('Кредит наличными')).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /Получить онлайн/i}));
});
