import { useCallback, useState } from 'react';
import { IUploadPhoto, IDataFetchState, ISession } from 'typings';
import { DataService } from 'services';

const performRequest = ({ type, file }: IUploadPhoto) => {
    const url = `/gateway/credit-application/upload-passport-photo?passportPhotoType=${type}`;
    const body = new FormData();
    body.append('photo', file);

    return new DataService(url)
        .setMethod('POST')
        .setHeader({ 'Content-Type': 'multipart/form-data' })
        .createRequest(body);
};

interface IPhotoSeqUploadHook {
    uploadPhotos: (photos: IUploadPhoto[]) => void;
    state: IDataFetchState<Partial<ISession>>;
}

export function useSequencePhotoUpload(): IPhotoSeqUploadHook {
    const [hasError, setError] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const uploadPhotos = useCallback(async (photos: IUploadPhoto[]) => {
        try {
            setFetching(true);
            const result = await Promise.all(photos.map(performRequest));
            const isAllOk = result.every((response) => response.data.code === 'OK');
            if (!isAllOk) {
                throw new Error();
            }
            setSuccess(true);
            setFetching(false);
        } catch (e) {
            setError(true);
            setFetching(false);
        }
    }, []);

    return { uploadPhotos, state: { isFetching, isSuccess, hasError, error: null, data: null } };
}
