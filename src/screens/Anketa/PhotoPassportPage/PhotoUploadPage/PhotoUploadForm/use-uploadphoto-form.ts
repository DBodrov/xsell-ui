import React from 'react';
import {useAnketa} from 'context/Anketa';
import {IPhotoSet} from './types';

export function useUploadPhoto() {
  const [status, setStatus] = React.useState('idle');
  const {updateAnketa} = useAnketa();
  const formSubmit = React.useCallback((photos: IPhotoSet) => {
    setStatus('pending');
    const updaters = Object.keys(photos).map(photoType => {
      const file: File = photos[photoType];
      const photo = new FormData();
      photo.append('photo', file);


      return fetch(`/gateway/credit-application/upload-passport-photo?passportPhotoType=${photoType}`, {
        method: 'post',
        body: photo
      })
    });

    Promise.all(updaters).then((response) => {
      setStatus('resolved')
      updateAnketa('PASSPORT_PHOTO', {})
    }, (error) => {
      setStatus('rejected');
      console.error(error)
    })
  }, [updateAnketa]);

  return {
    formSubmit,
    isSuccess: status === 'resolved',
    isUploading: status === 'pending',
  }
}
