import React, {useCallback, useState} from 'react';
import {Button} from 'neutrino-ui';
import {Form, FormField, SecuritySign} from 'components/lib';
import {PhotoField} from './components/PhotoField';
import {TPhotoType, IPhotoSet} from './types';
import {useUploadPhoto} from './use-uploadphoto-form';
import {PhotoCard} from './styles';


const initPhotos: IPhotoSet = {
  PERSON: null,
  REGISTRATION: null,
  PRIMARY: null,
};

function imagePreviewUrl(file?: File) {
  return file ? URL.createObjectURL(file) : '';
}

export function PhotoUploadForm() {
  const [photos, setPhoto] = useState<IPhotoSet>(initPhotos);
  const {formSubmit, isUploading} = useUploadPhoto();
  const isValidForm = Object.values(photos).every(Boolean);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formSubmit(photos);
    },
    [formSubmit, photos],
  );

  const handleChangePhoto = React.useCallback((file: File, type: TPhotoType) => {
    if (file && Number(file.size) > 10485760 && !file.type.startsWith('image')) return; // max 10Mb + file type image
    setPhoto(s => ({...s, [type]: file}));
  }, []);

  return (
    <Form css={{gridTemplate: 'auto/1fr'}} onSubmit={handleSubmit}>
      <PhotoCard>
        <PhotoField
          onChange={handleChangePhoto}
          photoType="PRIMARY"
          preview={imagePreviewUrl(photos['PRIMARY'])}
          showLoader={isUploading}
        />
        <PhotoField
          onChange={handleChangePhoto}
          photoType="REGISTRATION"
          preview={imagePreviewUrl(photos['REGISTRATION'])}
          showLoader={isUploading}
        />
        <PhotoField
          onChange={handleChangePhoto}
          photoType="PERSON"
          preview={imagePreviewUrl(photos['PERSON'])}
          showLoader={isUploading}
        />
      </PhotoCard>
      <div css={{display: 'flex', flexFlow: 'row wrap'}}>
      <FormField>
        <Button
          type="submit"
          variant="primary"
          flat
          disabled={!isValidForm}
          css={{borderRadius: 28, width: '100%'}}
        >
          Отправить фотографии
        </Button>
      </FormField>
      <FormField css={{height: 48, justifyContent: 'center'}}>
        <SecuritySign />
      </FormField>

      </div>
    </Form>
  );
}

// <div css={{width: '45%', marginRight: 10}}>
//   <ImageUpload name="upload-1" onUpload={setImagePrimary}>
//     <img src={photo} alt="Фото паспорта" />
//   </ImageUpload>
//   <span>Основной разворот</span>
// </div>
// <div css={{width: '45%'}}>
//   <ImageUpload name="upload-2" onUpload={setImageRegistration}>
//     <img src={photo} alt="Разворот с регистрацией" />
//   </ImageUpload>
//   <span>Разворот с регистрацией</span>
// </div>

// <div style={{maxWidth: '50%', margin: '0 auto'}}>
//   <ImageUpload name="selfie" onUpload={setSelfie}>
//     <img src={photo} alt="Селфи с паспортом" />
//   </ImageUpload>
//   <span>Селфи с паспортом</span>
// </div>
