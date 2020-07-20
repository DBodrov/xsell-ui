import React from 'react';
import { LayoutPage } from 'components/Layout';
import { ConfirmForm } from './ConfirmForm';
import css from './AgreementPage.module.scss';

export function AgreementPage() {
  return (
    <LayoutPage layoutStyles={{ backgroundColor: '#F0F0F0' }}>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Согласие на запрос кредитной истории</h2>
        <ConfirmForm />
      </div>
    </LayoutPage>
  );
}
