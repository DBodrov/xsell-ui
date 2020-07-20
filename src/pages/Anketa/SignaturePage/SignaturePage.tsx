import React from 'react';
import { LayoutPage } from 'components/Layout';
import { ConfirmForm } from './ConfirmForm';
import css from './SignaturePage.module.scss';

export function SignaturePage() {
  return (
    <LayoutPage layoutStyles={{ backgroundColor: '#F0F0F0' }}>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Подтверждение получения кредита</h2>
        <ConfirmForm />
      </div>
    </LayoutPage>
  );
}
