import React from 'react';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {CalculatorForm} from './CalculatorForm';

export function CalculatorPage() {
  return (
    <AppPage>
      <Screen>
        <H1 css={{marginBottom: 24}}>Рассчитайте условия кредита</H1>
        <CalculatorForm />
      </Screen>
    </AppPage>
  );
}
