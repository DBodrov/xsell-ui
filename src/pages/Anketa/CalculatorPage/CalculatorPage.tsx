import React from 'react';
import { LayoutPage } from 'components/Layout';
import { AutoStepper } from 'components/AutoStepper';
import { CalcAmountForm } from './CalcAmountForm';
import { useAnketa } from 'context/Anketa';
import css from './CalculatorPage.module.scss';

export function CalculatorPage() {
  const { step } = useAnketa();

  return (
    <LayoutPage>
      <div className={css.Page}>
        <AutoStepper status={step} />
        <h2 className={css.PageTitle}>Рассчитайте условия кредита</h2>
        <CalcAmountForm />
      </div>
    </LayoutPage>
  );
}
