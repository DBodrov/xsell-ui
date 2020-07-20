import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withAnketaProvider, IAnketa } from 'providers';
import { AdvanceScoringRefusalPage } from './AdvanceScoringRefusalPage';

afterAll(cleanup);
const firstName = 'Иван';
const middleName = 'Иваныч';

describe('*** Anketa / ExecutionFailedPage ***', () => {
  test('should render page without crashing', () => {
    const { getByText } = withAnketaProvider(<AdvanceScoringRefusalPage />, {
      anketa: { firstName, middleName } as IAnketa,
    });
    getByText(firstName + ' ' + middleName);
  });
});
