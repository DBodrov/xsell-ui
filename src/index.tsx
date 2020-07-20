import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { Environment, auditService } from 'services';
import { AppProviders } from './context';
import { App } from './App';
import { globalStyles } from './globalStyles';
import './global.scss';

auditService.initAudit();

console.info('Version: ', process.env.VERSION);
console.info('Environment : ', Environment.getEnv());

ReactDOM.render(
  <StrictMode>
    <Global styles={globalStyles} />
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
  document.getElementById('app')
);
