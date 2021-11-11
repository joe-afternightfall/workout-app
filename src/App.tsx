import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { getTheme } from './configs/theme/app-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBottomNavigation from './components/app-shell/AppBottomNavigation';
import ProfileDialog from './components/top-level-components/profile-screen/ProfileDialog';
import WhichPhaseDialog from './components/app-shell/WhichPhaseDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  root: {
    padding: '24px 12px 12px 12px',
  },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getTheme()}>
        <div className={classes.root}>
          <CssBaseline />
          <ProfileDialog />
          <WhichPhaseDialog />

          <main>
            <div>{this.props.children}</div>
          </main>

          <AppBottomNavigation />
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

export default withStyles(styles, { withTheme: true })(App);
