import React from 'react';
import {AllProviders} from 'utils/test-utils';
// import {TLandingCode} from 'context/Auth';
// import {LoginPage} from 'screens/Auth/LoginPage';
import {TransferCardPage} from 'screens/Anketa/TransferCardPage';

// const landingMap: Record<string, TLandingCode> = {
//   '1': 'LANDING_TEST_1',
//   '2': 'LANDING_TEST_2',
//   '3': 'LANDING_TEST_3',
//   '4': 'LANDING_TEST_4',
// };

export function TestApp() {
  // const search = window.location.search.split('=')[1];
  const sendPassport = (step: string, anketa: any) => {
    //console.log(step, anketa);
  };
  // console.log(search);
  return (
    <AllProviders
      anketaContext={{
        updateAnketa: sendPassport,
        step: 'TRANSFER_DETAILS',
        anketa: {
          customerOtpCards: [
            {
              bankCardId: '1',
              bankCardNumber: '1234567890123456',
              cardExpirationDt: '09/23',
            },
            {
              bankCardId: '2',
              bankCardNumber: '0004567890123456',
              cardExpirationDt: '08/22',
            },
          ],
        },
      }}
    >
      <TransferCardPage />
    </AllProviders>
  );
}
