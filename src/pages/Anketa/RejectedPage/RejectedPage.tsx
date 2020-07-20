import React from 'react';
import { BasicButton } from 'lib/components/buttons';
import { auditService } from 'services';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { RejectedOptions } from 'components/ScoringOptions';
import mobileIcon from 'assets/images/mobile.svg';
import css from './RejectedPage.module.scss';

function toMap() {
  auditService.userEvent({
    category: 'FE_REDIRECT',
    action: 'To Office from Scoring Refusal',
  });
  window.location.href = 'https://www.otpbank.ru/maps/points/';
}

export function RejectedPage() {
  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>{/* <Username>{name => `${name}!`}</Username> */}</h2>
        <Card>
          <Card.Header>
            <img src={mobileIcon} alt="mobile" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Ваша заявка на кредит предварительно одобрена.</h3>
            <RejectedOptions />
          </Card.Body>
        </Card>
        <BasicButton
          className={css.ChoiceButton}
          type="button"
          theme="primary"
          value="Найти ближайший офис банка"
          onClick={toMap}
        />
        <div />
      </div>
    </LayoutPage>
  );
}
