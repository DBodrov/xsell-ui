import React from 'react';
import { LayoutPage } from 'components/Layout';
import { Spinner } from 'lib/components/Spinner';
import { Card } from 'components/Card';
import { List } from 'components/List';
import hourglassIcon from 'lib/ui-kit/assets/icons/otp/hourglass.svg';
import css from './PendingAdvanceScoringPage.module.scss';

export function PendingAdvanceScoringPage() {
  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Проверяем кредитную историю</h2>
        <Card>
          <Card.Header>
            <Spinner className={css.SpinnerSmall} loaderClassName={css.LoaderSmall} />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Ваша заявка в обработке</h3>
            <List>
              <List.ListItem>
                <img src={hourglassIcon} alt="X" />
                <span>Проверка кредитной истории займет 1-3 минуты.</span>
              </List.ListItem>
            </List>
          </Card.Body>
        </Card>
        <div />
      </div>
    </LayoutPage>
  );
}
