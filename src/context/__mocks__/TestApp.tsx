import React from 'react';
import { AllProviders } from 'utils/test-utils';
import { Landing } from 'screens/Landing';

export function TestApp() {
  return (
    <AllProviders
      anketaContext={{
        step: 'EXECUTION',
        anketa: {
          firstName: 'Иван',
          middleName: 'Кажыгет-оглы',
          batchDocumentLink: '/doc01.pdf',
        },
      }}>
      <Landing />
    </AllProviders>
  );
}
