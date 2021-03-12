import React, {useCallback} from 'react';
import {P, Button, Span} from 'neutrino-ui';
import {HeroText} from 'components/lib';
import {AppPage} from 'components/Layout/AppPage';
import {FooterDisclaimer, FooterSection} from 'components/Layout/AppPage/Footer/styles';
import {usePageView} from 'utils/use-page-view';
import {Page} from './styles';
import {useAuth} from 'context/Auth';

export function ComebackPage() {
  usePageView('/comeback');
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
          css={{width: '100%', maxWidth: 288, alignSelf: 'flex-start'}}
        >
          Продолжить
        </Button>
      </Page>
      <FooterSection>
        <FooterDisclaimer>
          <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
          <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
        </FooterDisclaimer>
        </FooterSection>
    </AppPage>
  );
}
