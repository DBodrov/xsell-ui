import React from 'react';
import { ClientNotFound } from 'pages/Authentication/ClientNotFound';

type Props = {
  error: { code: number; message: string };
};

export function AuthErrorContainer(props: Props) {
  const { error: { code, message } = {} } = props;
  if (code === 404) {
    return <ClientNotFound />;
  }
  return <span>{message}</span>;
}
