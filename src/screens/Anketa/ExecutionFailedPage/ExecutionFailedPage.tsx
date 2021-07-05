import React from 'react';
import {Button, Span} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {auditService} from 'services';
import {useAnketa} from 'context/Anketa';
import {toCapitalize} from 'utils/string.utils';
import {OPROSSO_FORM} from 'utils/externals';

const toPoll = () => {
  auditService.userEvent({category: 'FE_REDIRECT', action: 'Redirect to poll'}, {toBE: true});
  window.location.href = OPROSSO_FORM;
};

export function ExecutionFailedPage() {
  const {
    anketa: {firstName, middleName},
  } = useAnketa();

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  return (
    <AppPage>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Принято отрицательное решение</H1>
        <Span>
          {customerName}, по результатам детальной проверки по вашей заявке принято отрицательное решение.
        </Span>
        <Button css={{width: 288, alignSelf: 'center', marginTop: '2rem'}} onClick={toPoll} type="button" variant="primary" flat>
          Есть что сказать? Расскажите нам!
        </Button>
      </Screen>
    </AppPage>
  );
}
