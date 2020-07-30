import React, { useCallback, useState } from 'react';
import { useAuth, IAuth1Params } from 'context/Auth';
import { AppPage } from 'components/Layout';
import { Landing } from 'screens/Landing';
import { LoginForm } from './LoginForm';
import { prepareAuth1Args } from './utils';

export function LoginPage() {
  const [loginFormIsShown, setShowLoginForm] = useState(false);
  const { handleAuth1SignIn, clientSettings } = useAuth();
  const isClient = Boolean(clientSettings?.landingCode) ?? false;

  const handleLogin = useCallback(
    (customerInfo: IAuth1Params) => {
      const auth1Args = prepareAuth1Args(customerInfo);
      handleAuth1SignIn(auth1Args);
    },
    [handleAuth1SignIn]
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
        <LoginForm onLogin={handleLogin} />
      </AppPage>
    );
  }

  const landingCode = (clientSettings?.landingCode ?? 'LANDING_TEST_1');

  return <Landing landingCode={landingCode} onNextPage={handleNextPage} />;
}
