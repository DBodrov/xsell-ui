import React from 'react';
import {AppPage} from 'components/Layout';
import {H1} from 'components/lib';
import {Page} from './styles';
import {JobInfoForm} from './JobInfoForm'

export function JobInfoPage() {
  return (
    <AppPage>
      <Page>
        <H1 css={{marginBottom: 24}}>Проверьте свои данные</H1>
        <JobInfoForm />
      </Page>
    </AppPage>
  );
}
