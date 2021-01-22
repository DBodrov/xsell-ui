import React, {useCallback, Fragment, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useAnketa} from 'context/Anketa';
import {H1} from 'components/lib';
import {Spinner} from 'lib/components/Spinner';
import {PhotoUploadForm} from './PhotoUploadForm';
import {IPhotoSet} from 'typings';
import {useSequencePhotoUpload} from './photoUpload.hook';
import {Page} from '../styles';

export function PhotoUploadPage() {
  const history = useHistory();
  const {step, updateAnketa} = useAnketa();
  const {uploadPhotos, state} = useSequencePhotoUpload();

  const handleUploadPhoto = useCallback(
    (form: IPhotoSet) => {
      uploadPhotos([
        {file: form.imagePrimary, type: 'PRIMARY'},
        {file: form.imageRegistration, type: 'REGISTRATION'},
        {file: form.imageSelfie, type: 'PERSON'},
      ]);
    },
    [uploadPhotos],
  );

  const handlePhotoComplete = useCallback(() => updateAnketa(step, {}), [step, updateAnketa]);

  useEffect(() => {
    if (state.isSuccess) {
      handlePhotoComplete();
    }
  }, [handlePhotoComplete, history, state.hasError, state.isSuccess]);

  return (
    <Page>
      <H1>Фотографии</H1>
      <Fragment>
        {state.isFetching && <Spinner message="Сохраняем данные..." withBackdrop />}
        <PhotoUploadForm onSubmitForm={handleUploadPhoto} />
      </Fragment>
    </Page>
  );
}
