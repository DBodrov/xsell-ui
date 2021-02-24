import React, {useCallback, useState} from 'react';
import {P} from 'neutrino-ui';
import {useAuth, IAuth1Params} from 'context/Auth';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {Landing} from 'screens/Landing';
import {LoginForm} from './LoginForm';
import {SigninForm} from './SigninForm';
import {prepareAuth1Args} from './utils';

export function LoginPage() {
  const [loginFormIsShown, setShowLoginForm] = useState(false);
  const {handleAuth1SignIn, clientSettings} = useAuth();
  const isClient = Boolean(clientSettings?.landingCode) ?? false;
  const showNewForm = true;
  console.log('Login page render');

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

  if (loginFormIsShown) {
    return (
      <AppPage>
        <Screen>
          <H1>Заполните данные</H1>
          <P css={{paddingTop: 16, marginBottom: 40}}>
            Укажите свои данные, чтобы мы могли авторизовать вас и начать заполнять кредитную заявку.
          </P>
          <SigninForm />
        </Screen>

        {/* <LoginForm onLogin={handleLogin} /> */}
      </AppPage>
    );
  }

  const landingCode = clientSettings?.landingCode ?? 'LANDING_TEST_1';

  return <Landing landingCode={landingCode} onNextPage={handleNextPage} />;
}
