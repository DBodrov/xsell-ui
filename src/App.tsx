import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {Spinner} from 'components/lib';
import {useAuth} from './context/Auth';

const Auth1Container = React.lazy(() => import(/* webpackPrefetch: true */ /* webpackChunkName: "Auth1Container" */ './screens/Auth/Auth1Container'));
const Auth2Container = React.lazy(() => import(/* webpackPrefetch: true */ /* webpackChunkName: "Auth2Container" */ './screens/Auth/Auth2Container'));
const Anketa = React.lazy(() => import(/* webpackPrefetch: true */ /* webpackChunkName: "Anketa" */ 'screens/Anketa'));

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Auth1Container />
      </Route>
      <Route path="/phoneverify">
        <Auth2Container />
      </Route>
      <Route path="/anketa">
        <Anketa />
      </Route>
    </Switch>
  );
}

export function App() {
  const {authStatus} = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (authStatus === 'AUTH1_REQUIRED') {
      history.replace('/', {step: 1});
      return;
    } else if (authStatus === 'AUTH2_REQUIRED') {
      history.replace('/phoneverify');
      return;
    } else if (authStatus === 'OK') {
      history.replace('/anketa');
      return;
    }
    history.replace('/');
  }, [authStatus, history]);

  return (
    <React.Suspense fallback={<Spinner withBackdrop message="Загрузка..." />}>
      <AppRoutes />
    </React.Suspense>
  );
}
