import React, {useCallback, useState} from 'react';
import {P, Span} from 'neutrino-ui';
import {useAuth, IAuth1Params} from 'context/Auth';
import {AppPage, Screen} from 'components/Layout';
import {FooterDisclaimer, FooterSection} from 'components/Layout/AppPage/Footer/styles';
import {H1, LinkButton} from 'components/lib';
import {Landing} from 'screens/Landing';
import {OPROSSO} from 'utils/externals';
import {SigninForm} from './SigninForm';
import {prepareAuth1Args} from './utils';

export function LoginPage() {
  const [loginFormIsShown, setShowLoginForm] = useState(false);
  const {handleAuth1SignIn, clientSettings} = useAuth();
  const isClient = Boolean(clientSettings?.landingCode) ?? false;

  const handleLogin = useCallback(
    (customerInfo: IAuth1Params) => {
      const auth1Args = prepareAuth1Args(customerInfo);
      handleAuth1SignIn(auth1Args);
    },
    [handleAuth1SignIn],
  );

  const handleNextPage = useCallback(() => {
    if (isClient) {
      handleAuth1SignIn(null, false, true);
      return;
    } else {
      setShowLoginForm(true);
    }
  }, [handleAuth1SignIn, isClient]);

  const openOprosso = () => window.location.assign(OPROSSO.AUTH1_REQUIRED);

  if (loginFormIsShown) {
    return (
      <AppPage>
        <Screen>
          <H1>Заполните данные</H1>
          <P css={{paddingTop: 16, marginBottom: 40}}>
            Укажите свои данные, чтобы мы могли авторизовать вас и начать заполнять кредитную заявку.
          </P>
          <SigninForm onLogin={handleLogin} />
        </Screen>
        <FooterSection>
        <FooterDisclaimer>
          <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
          <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
        </FooterDisclaimer>
        <LinkButton css={{color: 'var(--color-primary)', fontSize: 14}} onClick={openOprosso}>
          Ваше мнение об онлайн-кредите
        </LinkButton>
        </FooterSection>
      </AppPage>
    );
  }

  const landingCode = clientSettings?.landingCode ?? 'LANDING_TEST_3';

  return <Landing landingCode={landingCode} onNextPage={handleNextPage} />;
}
