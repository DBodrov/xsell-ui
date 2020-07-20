import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { CompletedPage } from './CompletedPage';

afterAll(cleanup);

describe('*** Anketa / CompletedPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<CompletedPage />, {
      anketa: { firstName: 'Иван', middleName: 'Иваныч' } as IAnketa,
    });
    getByText('Спасибо, что выбрали нас!');
  });
});
