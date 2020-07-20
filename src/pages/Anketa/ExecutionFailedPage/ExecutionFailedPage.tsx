import React from 'react';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { auditService } from 'services';
import { useAnketa } from 'context/Anketa';
import { toCapitalize } from 'utils/string.utils';
import { OPROSSO_FORM } from 'utils/externals';
import sadnessmaskIcon from 'assets/images/mask.svg';
import css from './ExecutionFailedPage.module.scss';

const toPoll = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to poll' }, { toBE: true });
  window.location.href = OPROSSO_FORM;
};

export function ExecutionFailedPage() {
  const {
    anketa: { firstName, middleName },
  } = useAnketa();

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>{customerName}</h2>
        <Card>
          <Card.Header>
            <img src={sadnessmaskIcon} alt="" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Принято отрицательное решение</h3>
            <span style={{ marginBottom: '2rem' }}>
              По результатам детальной проверки по вашей заявке принято отрицательное решение.
            </span>
          </Card.Body>
        </Card>
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
