import React from 'react';
import { List } from 'components/List';
import moneyIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';

export function RejectedOptions() {
  return (
    <List>
      <List.ListItem>
        <img src={moneyIcon} alt="X" />
        <span>
          Для финального решения и получения кредита, пожалуйста, обратитесь в ближайший к вам Центр продаж
          Банка.
        </span>
      </List.ListItem>
    </List>
  );
}
