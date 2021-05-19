import React, {Fragment} from 'react';
import {Span} from 'neutrino-ui';
import {Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {PhotoUploadForm} from './PhotoUploadForm';

export function PhotoUploadPage() {

  return (
    <Screen>
      <H1 css={{margin: '0 0 16px'}}>Сделайте фото</H1>
      <Span css={{marginBottom: 24}}>Сделайте три фотографии паспорта: ФИО, прописка, собственное фото с паспортом.</Span>
      <Fragment>
        <PhotoUploadForm />
      </Fragment>
    </Screen>
  );
}
