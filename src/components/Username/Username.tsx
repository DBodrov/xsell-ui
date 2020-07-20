import React from 'react';
import { useAnketa } from 'providers';

export function Username({ children }: { children: (name: string) => React.ReactNode }) {
  const { session } = useAnketa();

  const { data: { firstName = '', lastName = '' } = {} } = session;

  return <span>{children(`${firstName} ${lastName}`)}</span>;
}
