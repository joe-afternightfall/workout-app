import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { getLightTheme } from './configs/theme/light-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomAppBar from './components/app-shell/BottomAppBar';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  root: {
    padding: '24px 16px',
  },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.root}>
          <CssBaseline />

          <main>
            <div>{this.props.children}</div>
          </main>

          <BottomAppBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

export default withStyles(styles, { withTheme: true })(App);
