import React from 'react';
import {Button, Span} from 'neutrino-ui';
import {PhotoUploadPage} from './PhotoUploadPage';
import {useAnketa} from 'context/Anketa';
import {AppPage, Screen} from 'components/Layout';
import {H1, Form, FormField} from 'components/lib';


export function PhotoPassportPage() {
  const [showUploadPage, setShowUpload] = React.useState(false);
  const {refusePhotoPassport} = useAnketa();

  const handleAgreePhoto = () => setShowUpload(true);

  return (
    <AppPage>
      {showUploadPage ? (
        <PhotoUploadPage />
      ) : (
        <Screen>
          <H1 css={{margin: '24px 0 16px'}}>Три фотографии с документами</H1>
          <Span>
            Предоставляя нам своё фото и фото документов вы повышаете вероятность одобрения вашего кредита на
            20%
          </Span>
          <Form>
            <FormField css={{marginBottom: 0}}>
              <Button
                type="button"
                variant="primary"
                flat
                style={{width: '100%', marginTop: '1rem'}}
                onClick={handleAgreePhoto}
              >
                Да, с фото
              </Button>
            </FormField>
            <FormField css={{marginBottom: 0}}>
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
            </FormField>
          </Form>
        </Screen>
      )}
    </AppPage>
  );
}
