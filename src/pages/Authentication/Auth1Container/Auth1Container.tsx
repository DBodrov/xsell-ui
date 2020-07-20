import React from 'react';
import { Cookies } from 'utils/cookies';
import { LoginPage } from 'pages/Authentication/LoginPage';
import { ComebackPage } from 'pages/Authentication/ComebackPage';

export default function Auth1Container() {
  const isComeback = Cookies.getCookie(Cookies.USER_DATA).length > 0;

  if (isComeback) {
    return <ComebackPage />;
  }
  return <LoginPage />;
}
