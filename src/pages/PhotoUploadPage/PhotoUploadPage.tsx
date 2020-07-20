import React, { useCallback, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAnketa } from 'context/Anketa';
import { Spinner } from 'lib/components/Spinner';
import { LayoutPage } from 'components/Layout';
import { PhotoUploadForm } from 'components/PhotoUploadForm';
import { AutoStepper } from 'components/AutoStepper';
import { IPhotoSet } from 'typings';
import css from './PhotoUploadPage.module.scss';
import { useSequencePhotoUpload } from './photoUpload.hook';

export function PhotoUploadPage() {
    const history = useHistory();
    const { step, updateAnketa } = useAnketa();
    const { uploadPhotos, state } = useSequencePhotoUpload();

    const handleUploadPhoto = useCallback(
        (form: IPhotoSet) => {
            uploadPhotos([
                { file: form.imagePrimary, type: 'PRIMARY' },
                { file: form.imageRegistration, type: 'REGISTRATION' },
                { file: form.imageSelfie, type: 'PERSON' },
            ]);
        },
        [uploadPhotos]
    );

    const handlePhotoComplete = useCallback(() => updateAnketa(step, {}), [step, updateAnketa]);

    useEffect(() => {
        // if (state.hasError) {
        //     history.push('/ops');
        // }

        if (state.isSuccess) {
            handlePhotoComplete();
        }
    }, [handlePhotoComplete, history, state.hasError, state.isSuccess]);

    return (
        <LayoutPage>
            <AutoStepper status="PASSPORT_PHOTO" />
            <div className={css.Page}>
                <h2 className={css.PageTitle}>Сделайте фото паспорта</h2>
                <Fragment>
                    {state.isFetching && <Spinner message="Сохраняем данные..." withBackdrop />}
                    <PhotoUploadForm onSubmitForm={handleUploadPhoto} />
                </Fragment>
            </div>
        </LayoutPage>
    );
}
