import React, { useCallback, useState } from 'react';
import { useAuth, IAuth1Params } from 'context/Auth';
import { LayoutPage } from 'components/Layout/LayoutPage';
import { AutoStepper } from 'components/AutoStepper/AutoStepper';
import { Landing } from '../Landing';
import { LoginForm } from './LoginForm';
import { prepareAuth1Args } from './utils';

export function LoginPage() {
    const [loginFormIsShown, setShowLoginForm] = useState(false);
    const { handleAuth1SignIn, clientSettings } = useAuth();
    const isClient = clientSettings?.hasOwnProperty('landingCode') ?? false;

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
            <LayoutPage>
                <AutoStepper status={null} />
                <LoginForm onLogin={handleLogin} />
            </LayoutPage>
        );
    }

    const landingCode = clientSettings?.landingCode ?? 'LANDING_TEST_3';

    return <Landing onNextPage={handleNextPage} variant={landingCode} />;
}
