import React from 'react';
import {Span} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {HourglassIcon, PhonespeakerIcon} from 'icons';

export function PendingScoringPage() {
  return (
    <AppPage>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Ваша заявка в обработке</H1>
        <Span>Спасибо, что выбрали нас!</Span>
        <ul
          css={{
            display: 'flex',
            flexFlow: 'column nowrap',
            margin: '1.5rem 0 0',
            padding: 0,
            listStyle: 'none',
            gap: '1rem'
          }}
        >
          <li
            css={{
              display: 'flex',
              flexFlow: 'row nowrap',
              gap: '0.5rem',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingRight: '2rem',
            }}
          >
            <HourglassIcon fill="var(--color-primary)" css={{minWidth: 24, minHeight: 24}} />
            <Span>Принятие решения займет около 20 минут.</Span>
          </li>
          <li
            css={{
              display: 'flex',
              flexFlow: 'row nowrap',
              gap: '0.5rem',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingRight: '2rem',
            }}
          >
            <PhonespeakerIcon fill="var(--color-primary)" css={{minWidth: 24, minHeight: 24}} />
            <Span>
              Пожалуйста, оставайтесь на связи, Вам может позвонить сотрудник Банка для уточнения
              дополнительной информации!
            </Span>
          </li>
        </ul>
      </Screen>
    </AppPage>
  );
}
