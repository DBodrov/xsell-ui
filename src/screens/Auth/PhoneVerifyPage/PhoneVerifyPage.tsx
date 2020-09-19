import React from 'react';
import {P} from 'neutrino-ui';
import {AppPage} from 'components/Layout';
import {H1} from 'components/lib';
import {SMSForm} from './SMSForm';
import {Page} from './styles';

export function PhoneVerifyPage() {
  return (
    <AppPage noStepper>
      <Page>
        <H1 css={{margin: '24px 0 16px'}}>Подтвердите вход</H1>
        <P>Введите СМС которая придёт на ваш номер.</P>
        <SMSForm />
      </Page>
    </AppPage>
  );
}
