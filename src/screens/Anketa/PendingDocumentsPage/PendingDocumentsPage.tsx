import React from 'react';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';

export function PendingDocumentsPage() {
  return (
    <AppPage>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Ваша заявка на финальном рассмотрении</H1>
        <span>
          Пожалуйста, оставайтесь на связи. Вам может поступить контрольный звонок из ОТП Банк в течении часа.
        </span>
      </Screen>
    </AppPage>
  );
}
