import React from 'react';
import {Button, Span} from 'neutrino-ui';
import {H2} from 'components/lib';
import {AppPage, Screen} from 'components/Layout';
import {auditService} from 'services';

const toMap = () => {
  auditService.userEvent({category: 'FE_REDIRECT', action: 'Redirect to office map'});
  window.location.href = 'https://www.otpbank.ru/maps/points/';
};

const toCall = () => {
  auditService.userEvent({category: 'FE_REDIRECT', action: 'User call 0707'});
  window.location.href = 'tel:0707';
};

const toOTPAnketa = () => {
  auditService.userEvent({category: 'FE_REDIRECT', action: 'Redirect to out anketa'});
  window.location.href = 'https://anketa.otpbank.ru/';
};

export function ClientNotFound() {
  return (
    <AppPage noStepper>
      <Screen>
        <H2 css={{marginBottom: '1rem'}}>Не можем вас найти</H2>
        <Span>Для оформления кредита вы можете выбрать один из доступных вариантов</Span>
        <Button type="button" variant="primary" onClick={toCall} flat css={{width: '18rem', margin: '1rem 0'}}>
          Позвонить в банк (0707)
        </Button>
        <Button type="button" variant="primary" onClick={toMap} flat css={{width: '18rem', marginBottom: '1rem'}}>
          Найти ближайший офис банка
        </Button>
        <Button type="button" variant="primary" flat outline onClick={toOTPAnketa} css={{width: '18rem'}}>
          Заполнить анкету на кредит
        </Button>
      </Screen>
    </AppPage>
  );
}
