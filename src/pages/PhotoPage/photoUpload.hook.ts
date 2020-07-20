import { useCallback } from 'react';
import { useDataApi } from 'hooks';
import { IUploadPhoto, IDataFetchState, ISession } from 'typings';

interface IPhotoUploadHook {
    uploadPhoto: (jobInfo: IUploadPhoto) => void;
    photoUploadState: IDataFetchState<Partial<ISession>>;
}

export function usePhotoUpload(): IPhotoUploadHook {
    const { performRequest, state } = useDataApi();

    const uploadPhoto = useCallback(
        ({ type, file }: IUploadPhoto) => {
            const url = `/gateway/credit-application/upload-passport-photo?passportPhotoType=${type}`;

            const body = new FormData();
            body.append('photo', file);

            performRequest({
                url,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body,
            });
        },
        [performRequest]
    );

    return { uploadPhoto, photoUploadState: state };
}
