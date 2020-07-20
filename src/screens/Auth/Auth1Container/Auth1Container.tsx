import React from 'react';
import { Cookies } from 'utils/cookies';
import { LoginPage } from 'screens/Auth/LoginPage';
import { ComebackPage } from 'screens/Auth/ComebackPage';

export default function Auth1Container() {
  const isComeback = Cookies.getCookie(Cookies.USER_DATA).length > 0;

  if (isComeback) {
    return <ComebackPage />;
  }
  return <LoginPage />;
}
