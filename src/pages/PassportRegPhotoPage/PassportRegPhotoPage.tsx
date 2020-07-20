import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Spinner } from 'lib/components/Spinner';
import passportIcon from 'assets/images/passport-reg-frame.svg';
import { PassportPhoto } from 'src/components/PassportPhoto/PassportPhoto';
import css from './PassportRegPhotoPage.module.scss';
import { usePhotoUpload } from '../PhotoPage/photoUpload.hook';
import { useAnketaUpdaters, useAnketa } from '../../providers';

export function PassportRegPhotoPage({ history }: RouteComponentProps) {
    const { anketaStatus } = useAnketa();
    const { handleUpdateAnketa } = useAnketaUpdaters();
    const { uploadPhoto, photoUploadState } = usePhotoUpload();

    const handleTakingPhoto = useCallback(
        async file => {
            uploadPhoto({ type: 'REGISTRATION', file });
        },
        [uploadPhoto]
    );

    const handlePhotoComplete = useCallback(() => handleUpdateAnketa(anketaStatus, {}), [
        anketaStatus,
        handleUpdateAnketa,
    ]);

    useEffect(() => {
        if (photoUploadState.hasError) {
            history.push('/ops', { message: photoUploadState.error.errorMessage });
        }

        if (photoUploadState.isSuccess) {
            handlePhotoComplete();
        }
    }, [
        handlePhotoComplete,
        history,
        photoUploadState.error.errorMessage,
        photoUploadState.hasError,
        photoUploadState.isSuccess,
    ]);

    return (
        <div className={css.Page}>
            {photoUploadState.isFetching && <Spinner message="Сохраняем данные..." withBackdrop />}
            <PassportPhoto
                onPhotoCapture={handleTakingPhoto}
                step={
                    <span>
                        #2 из 2: <b>Прописка</b>
                    </span>
                }
                hint={
                    <span>
                        Наведите на паспорт
                        <br />
                        <b>(разворот с пропиской)</b>
                    </span>
                }
                mask={<img src={passportIcon} alt="tablet" />}
            />
        </div>
    );
}
