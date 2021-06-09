import React from 'react';
import {AppPage, Screen} from 'components/Layout';
import {H1, SecuritySign} from 'components/lib';
import {SMSForm} from './SMSForm';

export function AgreementPage() {

  return (
    <AppPage noStepper>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Согласие на запрос кредитной истории</H1>
        <SMSForm />
        <div css={{paddingTop: '2rem', '@media (max-width: 575px)': {alignSelf: 'center'}}}>
          <SecuritySign />
        </div>
      </Screen>
    </AppPage>
  );
}
