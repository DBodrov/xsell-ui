import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Spinner } from 'lib/components/Spinner';
import passportIcon from 'assets/images/passport-frame.svg';
import { PassportPhoto } from 'src/components/PassportPhoto/PassportPhoto';
import css from './PassportPhotoPage.module.scss';
import { usePhotoUpload } from '../PhotoPage/photoUpload.hook';

export function PassportPhotoPage({ history }: RouteComponentProps) {
    const { uploadPhoto, photoUploadState } = usePhotoUpload();

    const handleTakingPhoto = useCallback(
        async file => {
            uploadPhoto({ type: 'PRIMARY', file });
        },
        [uploadPhoto]
    );

    useEffect(() => {
        if (photoUploadState.hasError) {
            history.push('/ops', { message: photoUploadState.error.errorMessage });
        }
    }, [history, photoUploadState.error.errorMessage, photoUploadState.hasError]);

    return (
        <div className={css.Page}>
            {photoUploadState.isFetching && <Spinner message="Сохраняем данные..." withBackdrop />}
            <PassportPhoto
                onPhotoCapture={handleTakingPhoto}
                step={
                    <span>
                        #1 из 2: <b>Лицо</b>
                    </span>
                }
                hint={
                    <span>
                        Наведите на паспорт
                        <br />
                        <b>(разворот с фото)</b>
                    </span>
                }
                mask={<img src={passportIcon} alt="tablet" />}
            />
        </div>
    );
}
