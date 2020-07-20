import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { PendingDocumentsPage } from './PendingDocumentsPage';

afterAll(cleanup);
const firstName = 'Иван';
const middleName = 'Иваныч';

describe('*** Anketa / PendingDocumentsPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<PendingDocumentsPage />, {
      anketa: { firstName, middleName } as IAnketa,
    });
    getByText(firstName + ' ' + middleName);
  });
});
