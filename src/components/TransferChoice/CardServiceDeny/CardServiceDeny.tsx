import React from 'react';
import { Card } from 'components/Card';
import { List } from 'components/List';
import InfoIcon from 'ui-kit/assets/icons/otp/icon-info.svg';
import css from './CardServiceDeny.module.scss';

export function CardServiceDeny() {
  return (
    <Card className={css.FormCard}>
      <h3 className={css.CardTitle}>Извините сервис временно недоступен</h3>
      <List>
        <List.ListItem>
          <img src={InfoIcon} alt="X" />
          <span>Вы можете получить перевод на реквизиты счёта</span>
        </List.ListItem>
      </List>
    </Card>
  );
}
