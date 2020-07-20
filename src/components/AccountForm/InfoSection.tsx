import React from 'react';
import { Card } from 'components/Card';
import { List } from 'components/List';
import MoneyAtmIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';
import InfoIcon from 'lib/ui-kit/assets/icons/otp/icon-info.svg';
import css from './AccountForm.module.scss';

export function InfoSection() {
    return (
        <Card className={css.InfoSectionCard}>
            <Card.Body>
                <List>
                    <List.ListItem>
                        <img src={MoneyAtmIcon} alt="X" />
                        <span>
                            Деньги будут отправлены на ваше имя по указанным реквизитам{' '}
                            <b>после подписания вами кредитного договора</b>
                        </span>
                    </List.ListItem>
                    <List.ListItem>
                        <img src={InfoIcon} alt="X" />
                        <span>
                            В случае ошибки в реквизитах, деньги не пропадут, а вернутся на ваш счет в ОТП
                            Банк
                        </span>
                    </List.ListItem>
                </List>
            </Card.Body>
        </Card>
    );
}
