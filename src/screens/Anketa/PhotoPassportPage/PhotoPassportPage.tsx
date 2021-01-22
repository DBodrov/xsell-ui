import React from 'react';
import {Button, Span} from 'neutrino-ui';
import {PhotoUploadPage} from './PhotoUploadPage';
import {useAnketa} from 'context/Anketa';
// import {BasicButton} from 'lib/components/buttons';
import {AppPage} from 'components/Layout';
import {H1, H2} from 'components/lib';
import {Page, ConfirmForm} from './styles';
import womanWithPassportIcon from 'assets/images/woman-with-passport.png';
import infoIcon from 'assets/images/info.svg';

export function PhotoPassportPage() {
  const [showUploadPage, setShowUpload] = React.useState(false);
  const {refusePhotoPassport} = useAnketa();

  const handleAgreePhoto = () => setShowUpload(true);

  return (
    <AppPage>
      {showUploadPage ? (
        <PhotoUploadPage />
      ) : (
        <Page>
          <H1>Три фотографии с документами</H1>
          <ConfirmForm>
            <img src={womanWithPassportIcon} alt="" css={{alignSelf: 'center'}} />
            <div>
              <H2>Сфотографироваться со своим паспортом</H2>
              <div css={{display: 'flex', flexFlow: 'row nowrap'}}>
                <img src={infoIcon} alt="" css={{marginRight: 18}} />
                <Span>
                  Предоставляя нам своё фото и фото документов вы повышаете вероятность одобрения вашего
                  кредита на 20%
                </Span>
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              flat
              style={{width: '100%', marginTop: '1rem'}}
              onClick={handleAgreePhoto}
            >
              Да, с фото
            </Button>
            <Button
              type="button"
              variant="primary"
              flat
              outline
              style={{width: '100%', marginTop: '1rem'}}
              onClick={refusePhotoPassport}
            >
              Нет, не готов
            </Button>
          </ConfirmForm>
        </Page>
      )}
    </AppPage>
  );
}
