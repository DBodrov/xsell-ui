import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ProdMode } from 'services/Environment';
import { theme } from '../globalStyles';
import { AuthProvider } from './Auth';
import { ErrorProvider } from './Error';
import { TestApp } from './__mocks__/TestApp';

export function AppProviders({ children }: any) {
  if (!ProdMode && window.location.pathname.indexOf('/dev/app') > -1) {
    return (
      <ThemeProvider theme={theme}>
        <TestApp />;
      </ThemeProvider>
    );
  }
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <AuthProvider>{children}</AuthProvider>
        </ErrorProvider>
      </ThemeProvider>
    </Router>
  );
}
