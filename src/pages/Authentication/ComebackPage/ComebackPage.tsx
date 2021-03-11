import React, { useCallback } from 'react';
import {Span} from 'neutrino-ui';
import { AppPage, Screen } from 'components/Layout';
import {H2} from 'components/lib';

import { BasicButton } from 'lib/components/buttons';
import { useAuth } from 'context/Auth';
import css from './ComebackPage.module.scss';

export function ComebackPage() {
  const { handleAuth1SignIn } = useAuth();
  const handleUserComeback = useCallback(() => {
    handleAuth1SignIn(null, true);
  }, [handleAuth1SignIn]);

  return (
    <AppPage>
      <Screen>
        <H2>Вас долго не было</H2>
        <Span css={{marginBottom: '1.5rem', alignSelf: 'flex-start'}}>
          Поэтому мы завершили ваш сеанс. Нажмите продолжить и введите СМС которая придёт на ваш номер.
        </Span>
        <BasicButton type="button" value="Продолжить" onClick={handleUserComeback} className={css.Button} />
      </Screen>
    </AppPage>
  );
}
