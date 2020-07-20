import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider } from 'providers';
import { JobInfo } from './JobInfo';

afterEach(cleanup);

describe('**** Anketa / JobInfo Page ****', () => {
  test('should render JobInfo Page', () => {
    const { getByText, container } = withAnketaProvider(<JobInfo />);
    getByText('Проверьте свои данные');
    const form = container.getElementsByTagName('form')[0];
    expect(form).toBeInTheDocument();
  });
});
