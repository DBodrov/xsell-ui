import React from 'react';
import { AnketaProvider } from 'context/Anketa';
import { AnketaRouter } from './AnketaRouter';

export function Anketa() {
  return (
    <AnketaProvider>
      <AnketaRouter />
    </AnketaProvider>
  );
}
