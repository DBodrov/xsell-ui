import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useAnketa} from 'context/Anketa';
import {usePageView} from 'utils/use-page-view';
import {AnketaRoutes} from './AnketaRoutes';
import {anketaRoutesMap} from './anketa.routingMap';

export function AnketaRouter() {
  const history = useHistory();
  const location = useLocation();
  const {step} = useAnketa();
  usePageView();


  useEffect(() => {
    //console.log('router', step, location.pathname);
    //FIXME: Костыль для фоток
    // if (location.pathname === '/anketa/photo/upload') {
    //   return;
    // }
    if (step) {
      const route = step && anketaRoutesMap.get(step);
      history.push(route.url, {step: route.step});

      if (location.pathname === '/anketa') {
        history.push(route.url, {step: route.step});
      }
    }
  }, [history, location.pathname, step]);

  return <AnketaRoutes />;
}
