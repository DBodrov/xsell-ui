import React from 'react';
import {Span} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {useAnketa} from 'context/Anketa';
import {toCapitalize} from 'utils/string.utils';

export function AdvanceScoringRefusalPage() {
  const {
    anketa: {firstName = '', middleName = ''},
  } = useAnketa();

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  return (
    <AppPage>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Принято отрицательное решение</H1>
        <Span>{customerName}, по одной из этих причин по вашей заявке принято отрицательное решение.</Span>
        <ul css={{padding: '1rem 0 0 1rem', margin: 0, listStyle: 'disc', color: 'var(--color-primary)'}}>
          <li css={{marginBottom: '1rem'}}>
            <Span>Превышена долговая нагрузка (если уже есть кредиты).</Span>
          </li>
          <li css={{marginBottom: '1rem'}}>
            <Span>Просрочка платежей (если сейчас или ранее были неоплаченные платежи по кредитам).</Span>{' '}
          </li>
          <li css={{marginBottom: '1rem'}}>
            <Span>Некорректные данные (если изменились персональные данные или паспорт недействителен).</Span>
          </li>
        </ul>
        <Span>Подайте новую заявку через 30 дней.</Span>
      </Screen>
    </AppPage>
  );
}
