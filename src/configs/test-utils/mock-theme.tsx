import React from 'react';
import { getTheme } from '../theme/app-theme';
import { ThemeProvider } from '@material-ui/core/styles';

export default function MockTheme({ children }: MockThemeProps): JSX.Element {
  const theme = getTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export interface MockThemeProps {
  children: JSX.Element;
}
