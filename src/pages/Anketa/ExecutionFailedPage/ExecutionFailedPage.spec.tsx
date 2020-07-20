import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { ExecutionFailedPage } from './ExecutionFailedPage';

afterAll(cleanup);
const firstName = 'Иван';
const middleName = 'Иваныч';

describe('*** Anketa / ExecutionFailedPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<ExecutionFailedPage />, {
      anketa: { firstName, middleName } as IAnketa,
    });
    getByText(firstName + ' ' + middleName);
  });
});
