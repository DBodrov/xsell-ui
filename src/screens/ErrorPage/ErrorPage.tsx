import React from 'react';
import {useLocation} from 'react-router-dom';
import {H1} from 'components/lib';
import {AppPage, Screen} from 'components/Layout';


export function ErrorPage() {
  const {state: {message = 'Что-то пошло не так'} = {}} = useLocation<{message: string}>();

  return (
    <AppPage>
      <Screen>
        <H1>{message}</H1>
      </Screen>
    </AppPage>
  );
}
