import React from 'react';
import { render, screen } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { RegistrationChanged } from './RegistrationChanged';

describe('*** RegistrationChanged Page ***', () => {
  test('should render page without crashing', () => {
    render(<RegistrationChanged />);
    expect(screen.getByText(/Похоже, что место вашей прописки изменилось/i)).toBeInTheDocument();
    const redirectButton = screen.getByRole('button', { name: /Найти ближайший офис банка/i } as any);
    expect(redirectButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Переоформить заявку/i } as any)).toBeInTheDocument();
  });
});
