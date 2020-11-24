import React from 'react';
import {AllProviders} from 'utils/test-utils';
// import {TLandingCode} from 'context/Auth';
// import {LoginPage} from 'screens/Auth/LoginPage';
import {JobInfo} from 'pages/Anketa/JobInfo';

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
    <AllProviders anketaContext={{updateAnketa: sendPassport, step: 'REGISTRATION_ADDRESS', anketa: {registrationAddress: 'РФ, Москва, улица Мира, 107'}}}>
      <JobInfo />
    </AllProviders>
  );
}
