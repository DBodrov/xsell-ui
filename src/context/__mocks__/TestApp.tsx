import React from 'react';
import { AllProviders } from 'utils/test-utils';
import { TLandingCode } from 'context/Auth';
import { LoginPage } from 'screens/Auth/LoginPage';
// import { CalculatorPage } from 'pages/Anketa/CalculatorPage';

const landingMap: Record<string, TLandingCode> = {
  '1': 'LANDING_TEST_1',
  '2': 'LANDING_TEST_2',
  '3': 'LANDING_TEST_3',
  '4': 'LANDING_TEST_4',
};

export function TestApp() {
  const search = window.location.search.split('=')[1];
  // console.log(search);
  return (
    <AllProviders
      authContext={{
        clientSettings: {
          landingCode: landingMap[search],
        },
      }}>
      <LoginPage />
    </AllProviders>
  );
}
