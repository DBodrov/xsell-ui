import React, { useCallback } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { List } from 'components/List';
import { auditService, UI } from 'services';
import { useAnketa } from 'context/Anketa';
import { toCapitalize } from 'utils/string.utils';
import { OPROSSO_FORM } from 'utils/externals';

import personIcon from 'assets/images/person.svg';
import billIcon from 'ui-kit/assets/icons/otp/bill.svg';
import hourglassIcon from 'ui-kit/assets/icons/otp/hourglass.svg';

import css from './CompletedPage.module.scss';
import { AutoStepper } from 'components/AutoStepper';

const toPoll = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to poll' }, { toBE: true });
  window.location.assign(OPROSSO_FORM);
};

export function CompletedPage() {
  const {
    step,
    anketa: { firstName, middleName, batchDocumentLink },
  } = useAnketa();

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  const downloadAllDocs = useCallback(() => {
    auditService.userEvent({ category: 'FE_REDIRECT', action: 'Download batched documents' }, { toBE: true });
    UI.downloadFile(`/gateway${batchDocumentLink}`, 'otpbank_documents');
  }, [batchDocumentLink]);

  return (
    <LayoutPage>
      <AutoStepper className={css.Stepper} status={step} />
      <div className={css.Page}>
        <h2 className={css.PageTitle}>{customerName}</h2>
        <Card>
          <Card.Header>
            <img src={personIcon} alt="person" />
          </Card.Header>
          <Card.Body>
            <h2 className={css.PageTitle}>Спасибо, что выбрали нас!</h2>
            <List>
              <List.ListItem>
                <img src={billIcon} alt="X" />
                <span>Ваша заявка будет рассмотрена в течении часа.</span>
              </List.ListItem>
              <List.ListItem>
                <img src={hourglassIcon} alt="X" />
                <span>
                  Напоминаем, что срок перевода денежных средств на счет в сторонней кредитной организации
                  составляет до 3 рабочих дней.
                </span>
              </List.ListItem>
            </List>
          </Card.Body>
        </Card>
        <BasicButton
          className={css.Button}
          type="button"
          onClick={downloadAllDocs}
          theme="primary"
          flat
          value="Скачать документы"
        />
        <BasicButton
          className={css.Button}
          onClick={toPoll}
          type="button"
          theme="secondary"
          flat
          value="Есть что сказать? Расскажите нам!"
        />
      </div>
    </LayoutPage>
  );
}
