import React, {useCallback, useState} from 'react';
import {Button} from 'neutrino-ui';
import {ImageUpload} from 'lib/components/ImageUpload';
import photo from 'assets/images/photo.svg';
import {UploadForm, PhotoCard} from './styles';

export interface IPhotoSet {
  imagePrimary: File;
  imageRegistration: File;
  imageSelfie: File;
}

interface IPhotoUploadFormProps {
  onSubmitForm: (photos: IPhotoSet) => void;
}

export function PhotoUploadForm(props: IPhotoUploadFormProps) {
  const {onSubmitForm} = props;
  const [imagePrimary, setImagePrimary] = useState<File>(null);
  const [imageRegistration, setImageRegistration] = useState<File>(null);
  const [imageSelfie, setSelfie] = useState<File>(null);
  const isValidForm = Boolean(imagePrimary && imageRegistration && imageSelfie);

  const handleSubmit = useCallback(() => {
    onSubmitForm({imagePrimary, imageRegistration, imageSelfie});
  }, [imagePrimary, imageRegistration, imageSelfie, onSubmitForm]);

  return (
    <UploadForm>
      <PhotoCard>
        <div css={{width: '45%', marginRight: 10}}>
          <ImageUpload name="upload-1" onUpload={setImagePrimary}>
            <img src={photo} alt="Фото паспорта" />
          </ImageUpload>
          <span>Основной разворот</span>
        </div>
        <div css={{width: '45%'}}>
          <ImageUpload name="upload-2" onUpload={setImageRegistration}>
            <img src={photo} alt="Разворот с регистрацией" />
          </ImageUpload>
          <span>Разворот с регистрацией</span>
        </div>

        <div style={{maxWidth: '50%', margin: '0 auto'}}>
          <ImageUpload name="selfie" onUpload={setSelfie}>
            <img src={photo} alt="Селфи с паспортом" />
          </ImageUpload>
          <span>Селфи с паспортом</span>
        </div>
        <Button onClick={handleSubmit} variant="primary" flat disabled={!isValidForm} css={{borderRadius: 4, width: '100%'}}>
          Отправить фотографии
        </Button>
      </PhotoCard>
    </UploadForm>
  );
}
