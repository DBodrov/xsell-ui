/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from 'context/Auth';

export function ProtectedRoute(props: RouteProps) {
  const { children, ...rest } = props;
  const { authStatus } = useAuth();
  return (
    <Route {...rest}>
      {authStatus === 'OK' ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
}
