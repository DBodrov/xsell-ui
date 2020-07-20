import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { ExecutionPage } from './ExecutionPage';

afterAll(cleanup);
const firstName = 'Иван';
const middleName = 'Иваныч';

describe('*** Anketa / ExecutionPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<ExecutionPage />, {
      anketa: { firstName, middleName } as IAnketa,
    });
    getByText(firstName + ' ' + middleName);
  });
});
