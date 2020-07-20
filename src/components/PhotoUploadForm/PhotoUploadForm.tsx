import React, { Fragment, useCallback, useState } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { IPhotoSet } from 'typings';
import { ImageUpload } from 'lib/components/ImageUpload';
import photo from 'assets/images/photo.svg';
import css from './PhotoUploadForm.module.scss';

interface IPhotoUploadFormProps {
  onSubmitForm: (photos: IPhotoSet) => void;
}

export function PhotoUploadForm(props: IPhotoUploadFormProps) {
  const { onSubmitForm } = props;
  const [imagePrimary, setImagePrimary] = useState<File>(null);
  const [imageRegistration, setImageRegistration] = useState<File>(null);
  const [imageSelfie, setSelfie] = useState<File>(null);
  const isValidForm = Boolean(imagePrimary && imageRegistration && imageSelfie);

  const handleSubmit = useCallback(() => {
    onSubmitForm({ imagePrimary, imageRegistration, imageSelfie });
  }, [imagePrimary, imageRegistration, imageSelfie, onSubmitForm]);

  return (
    <Fragment>
      <div className={css.Block}>
        <b className={css.Title}>СДЕЛАЙТЕ ФОТОГРАФИИ ПАСПОРТА</b>

        <div className={css.Uploads}>
          <div className={css.Row}>
            <div className={css.UploadBlock}>
              <ImageUpload name="upload-1" className={css.Upload} onUpload={setImagePrimary}>
                <img src={photo} alt="Фото паспорта" />
              </ImageUpload>
              <span className={css.Desc}>Основной разворот</span>
            </div>
            <div className={css.UploadBlock}>
              <ImageUpload name="upload-2" className={css.Upload} onUpload={setImageRegistration}>
                <img src={photo} alt="Разворот с регистрацией" />
              </ImageUpload>
              <span className={css.Desc}>Разворот с регистрацией</span>
            </div>
          </div>
          <div className={css.UploadBlock} style={{ maxWidth: '50%', margin: '0 auto' }}>
            <ImageUpload name="selfie" className={css.Upload} onUpload={setSelfie}>
              <img src={photo} alt="Селфи с паспортом" />
            </ImageUpload>
            <span className={css.Desc}>Селфи с паспортом</span>
          </div>
        </div>
      </div>
      <div className={css.FormFooter}>
        <BasicButton
          className={css.Submit}
          onClick={handleSubmit}
          type="button"
          theme="primary"
          flat
          value="Отправить фотографии"
          disabled={!isValidForm}
        />
      </div>
    </Fragment>
  );
}
