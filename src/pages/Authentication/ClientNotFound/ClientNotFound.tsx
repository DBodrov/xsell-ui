import React from 'react';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { DeclineOptions } from 'components/DeclineOptions';
import { auditService } from 'services';
import tabletIcon from 'assets/images/tablet.svg';
import css from './ClientNotFound.module.scss';

const toMap = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to office map' });
  window.location.href = 'https://www.otpbank.ru/maps/points/';
};

const toCall = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'User call 0707' });
  window.location.href = 'tel:0707';
};

const toOTPAnketa = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to out anketa' });
  window.location.href = 'https://anketa.otpbank.ru/';
};

export function ClientNotFound() {
  return (
    <LayoutPage>
      <div className={css.Page}>
        <Card>
          <Card.Header>
            <img src={tabletIcon} alt="tablet" />
          </Card.Header>
          <Card.Body>
            <h2 className={css.PageTitle}>Не можем вас найти</h2>
            <DeclineOptions />
          </Card.Body>
        </Card>
        <div className={css.ButtonGroup}>
          <BasicButton
            className={css.ChoiceButton}
            type="button"
            theme="primary"
            value="Позвонить в банк (0707)"
            onClick={toCall}
          />
          <BasicButton
            className={css.ChoiceButton}
            type="button"
            theme="primary"
            value="Найти ближайший офис банка"
            onClick={toMap}
          />
          <BasicButton
            className={css.ChoiceButton}
            type="button"
            theme="secondary"
            value="Заполнить анкету на кредит"
            onClick={toOTPAnketa}
          />
        </div>
      </div>
    </LayoutPage>
  );
}
