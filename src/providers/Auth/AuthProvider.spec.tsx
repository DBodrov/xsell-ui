jest.mock('pages/Authentication/PersonalLanding/image-loader');

import React from 'react';
import { useLocation } from 'react-router-dom';
import { render, cleanup } from 'utils/test-utils';
import { useAuth } from './AuthProvider';
import { AuthStatus } from './types';
import { Authentication } from 'pages/Authentication';
import { IErrorState } from 'src/typings/services';

afterEach(cleanup);

const setup = (status: AuthStatus, errorState: IErrorState = {}) => {
  let authResult = '';
  let locationPath = '';
  const TestComponent = () => {
    const { authStatus } = useAuth();
    const location = useLocation();
    authResult = authStatus;
    locationPath = location.pathname;

    return null;
  };

  const utils = render(
    <React.Fragment>
      <TestComponent />
      <Authentication />
    </React.Fragment>,
    { authContext: { authStatus: status, error: errorState } }
  );
  return { ...utils, authResult, locationPath };
};

describe('Tests for AuthProvider - Auth Routes', () => {
  test('SESSION_CREATED, route - /login', () => {
    const { authResult, locationPath } = setup(AuthStatus.SESSION_CREATED);
    expect(authResult).toEqual(AuthStatus.SESSION_CREATED);
    expect(locationPath).toEqual('/login');
  });

  test('USER_ISBACK, route - /comeback', () => {
    const { authResult, locationPath } = setup(AuthStatus.USER_ISBACK);
    expect(authResult).toEqual(AuthStatus.USER_ISBACK);
    expect(locationPath).toEqual('/comeback');
  });
  test('PHONE_CONFIRM, route - /phoneverify', () => {
    const { authResult, locationPath } = setup(AuthStatus.PHONE_CONFIRM);
    expect(authResult).toEqual(AuthStatus.PHONE_CONFIRM);
    expect(locationPath).toEqual('/phoneverify');
  });
  test('AUTH_RESOLVED, route - /anketa', () => {
    const { authResult, locationPath } = setup(AuthStatus.AUTH_RESOLVED);
    expect(authResult).toEqual(AuthStatus.AUTH_RESOLVED);
    expect(locationPath).toEqual('/anketa');
  });
  test('PHONE_RECONFIRM, route - /reconfirm', () => {
    const { authResult, locationPath } = setup(AuthStatus.PHONE_RECONFIRM);
    expect(authResult).toEqual(AuthStatus.PHONE_RECONFIRM);
    expect(locationPath).toEqual('/reconfirm');
  });
  test('AUTH_REJECTED, route - /clientnotfound', () => {
    const { authResult, locationPath } = setup(AuthStatus.AUTH_REJECTED, {
      errorNumber: 409,
      errorMessage: 'CLIENT NOT FOUND',
    });
    expect(authResult).toEqual(AuthStatus.AUTH_REJECTED);
    expect(locationPath).toEqual('/clientnotfound');
  });
});
