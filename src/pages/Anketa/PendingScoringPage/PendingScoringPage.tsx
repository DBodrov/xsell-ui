import React from 'react';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { PreScoringOptions } from 'components/ScoringOptions';
import mobileIcon from 'assets/images/mobile.svg';
import css from './PendingScoringPage.module.scss';
import { AutoStepper } from '../../../components/AutoStepper';
import { useAnketa } from 'context/Anketa';

export function PendingScoringPage() {
  const { step } = useAnketa();
  return (
    <LayoutPage>
      <AutoStepper className={css.Stepper} status={step} />
      <div className={css.Page}>
        <h2 className={css.PageTitle}></h2>
        <Card>
          <Card.Header>
            <img src={mobileIcon} alt="mobile" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Ваша заявка в обработке</h3>
            <PreScoringOptions />
          </Card.Body>
        </Card>
        <div />
      </div>
    </LayoutPage>
  );
}
