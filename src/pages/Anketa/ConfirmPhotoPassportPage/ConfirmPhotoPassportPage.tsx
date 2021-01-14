import React from 'react';
import {useHistory} from 'react-router-dom';
import {useAnketa} from 'context/Anketa';
import {BasicButton} from 'lib/components/buttons';
import {LayoutPage} from 'components/Layout';
import {AutoStepper} from 'components/AutoStepper';
import womanWithPassportIcon from 'assets/images/woman-with-passport.png';
import infoIcon from 'assets/images/info.svg';
import css from './ConfirmPhotoPassportPage.module.scss';

export function ConfirmPhotoPassportPage() {
  //const [showUploadPage, setShow] = React.useState(false);
  const history = useHistory();
  const {refusePhotoPassport} = useAnketa();

  const handleAgreePhoto = () => history.push('/anketa/photo/upload');

  return (
    <LayoutPage>
      <AutoStepper status="PASSPORT_PHOTO" />
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Три фотографии с документами</h2>
        <div className={css.ConfirmForm}>
          <img src={womanWithPassportIcon} alt="take passport" />
          <div className={css.Description}>
            <h3>Сфотографироваться со своим паспортом</h3>
            <div className={css.Info}>
              <img src={infoIcon} alt="info" />
              <p className={css.Text}>
                Предоставляя нам своё фото и фото документов вы повышаете вероятность одобрения вашего кредита
                на 20%
              </p>
            </div>
          </div>
          <BasicButton
            type="button"
            value="Да, с фото"
            theme="primary"
            style={{width: '100%', marginTop: '1rem'}}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={handleAgreePhoto}
          />
          <BasicButton
            type="button"
            value="Нет, не готов"
            theme="secondary"
            style={{width: '100%', marginTop: '1rem'}}
            onClick={refusePhotoPassport}
          />
        </div>
      </div>
    </LayoutPage>
  );
}
