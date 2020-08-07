import React, {useCallback} from 'react';
import {P, Button} from 'neutrino-ui';
import {HeroText} from 'components/lib';
import {AppPage} from 'components/Layout/AppPage';
import {Page} from './styles';
import {useAuth} from 'context/Auth';

export function ComebackPage() {
  const {handleAuth1SignIn} = useAuth();
  const handleUserComeback = useCallback(() => {
    handleAuth1SignIn(null, true);
  }, [handleAuth1SignIn]);

  return (
    <AppPage noStepper>
      <Page>
        <HeroText css={{alignSelf: 'flex-start', marginBottom: 16}}>
          Вас долго <span css={{whiteSpace: 'pre'}}>не было</span>
        </HeroText>
        <P css={{marginBottom: '1.5rem'}}>
          Поэтому мы завершили ваш сеанс. Нажмите продолжить и введите СМС которая придёт на ваш номер.
        </P>
        <Button
          type="button"
          flat
          variant="primary"
          onClick={handleUserComeback}
          css={{width: '100%', maxWidth: 414}}
        >
          Продолжить
        </Button>
      </Page>
    </AppPage>
  );
}
