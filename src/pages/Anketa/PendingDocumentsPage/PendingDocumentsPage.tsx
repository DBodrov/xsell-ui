import React from 'react';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { List } from 'components/List';
import { useAnketa } from 'context/Anketa';
import { toCapitalize } from 'utils/string.utils';
import mobileIcon from 'assets/images/mobile.svg';
import phonespeakerIcon from 'assets/images/phone-speaker.svg';
import css from './PendingDocumentsPage.module.scss';

export function PendingDocumentsPage() {
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
            <img src={mobileIcon} alt="mobile" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Ваша заявка на финальном рассмотрении</h3>
            <List>
              <List.ListItem>
                <img src={phonespeakerIcon} alt="" />
                <span>
                  Пожалуйста, оставайтесь на связи. Вам может поступить контрольный звонок из ОТП Банк в
                  течении часа.
                </span>
              </List.ListItem>
            </List>
          </Card.Body>
        </Card>
      </div>
    </LayoutPage>
  );
}
