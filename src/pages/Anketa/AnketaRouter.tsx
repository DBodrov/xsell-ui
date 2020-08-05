import React, {useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAnketa} from 'context/Anketa'
import {AnketaRoutes} from './AnketaRoutes'
import {anketaRoutesMap} from './anketa.routingMap'

export function AnketaRouter() {
  const history = useHistory()
  const location = useLocation()
  const {step} = useAnketa()
  const route = anketaRoutesMap.get(step)

  useEffect(() => {
    history.push(route.url, {step: route.step})
  }, [history, route.step, route.url])

  useEffect(() => {
    if (location.pathname === '/anketa') {
      history.push(route.url, {step: route.step})
    }
  }, [history, location.pathname, route.step, route.url])

  return <AnketaRoutes />
}
