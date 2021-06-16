import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../globalStyles';
import { AuthProvider } from './Auth';
import { ErrorProvider } from './Error';

export function AppProviders({ children }: any) {

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
