import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {Global} from '@emotion/core';
import {auditService} from 'services';
import {server} from './test/dev-server';
import {AppProviders} from './context';
import {App} from './App';
import {globalStyles} from './globalStyles';
import './global.scss';

auditService.initAudit();

if (process.env.USE_API_MOCK === 'true') {
  server.start();
}

ReactDOM.render(
  <StrictMode>
    <Global styles={globalStyles} />
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
  document.getElementById('app'),
);
