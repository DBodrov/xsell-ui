import React from 'react';
import { List } from 'components/List';
import hourglassIcon from 'lib/ui-kit/assets/icons/otp/hourglass.svg';
import phoneIcon from 'lib/ui-kit/assets/icons/otp/phone.svg';
// import moneyIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';
// import moneyIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';

export function PreScoringOptions() {
  return (
    <List>
      <List.ListItem>
        <img src={hourglassIcon} alt="X" />
        <span>Принятие решения займет около 20 минут</span>
      </List.ListItem>
      <List.ListItem>
        <img src={phoneIcon} alt="X" />
        <span>
          Пожалуйста, оставайтесь на связи, Вам может позвонить сотрудник Банка для уточнения дополнительной
          информации!
        </span>
      </List.ListItem>
    </List>
  );
}
