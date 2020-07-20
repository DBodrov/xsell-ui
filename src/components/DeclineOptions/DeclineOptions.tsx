import React from 'react';
import { List } from 'components/List';
import moneyIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';

export function DeclineOptions() {
    return (
        <List>
            <List.ListItem>
                <img src={moneyIcon} alt="X" />
                <span>Для оформления кредита вы можете выбрать один из доступных вариантов</span>
            </List.ListItem>
        </List>
    );
}
