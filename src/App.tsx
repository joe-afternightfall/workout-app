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
import BottomAppBar from './components/app-shell/BottomAppBar';
import ProfileDialog from './components/top-level-components/profile-screen/ProfileDialog';
import WhichPhaseDialog from './components/app-shell/WhichPhaseDialog';
import DeleteExerciseDrawer from './components/app-shell/DeleteExerciseDrawer';
import CountdownTimer from './components/widgets/countdown-timer/CountdownTimer';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  root: {
    padding: '24px 12px 12px 12px',
  },
  bottomPaddingRoot: {
    padding: '24px 12px 10vh 12px',
  },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes, bottomPadding, children } = this.props;

    return (
      <MuiThemeProvider theme={getTheme()}>
        <div
          className={bottomPadding ? classes.bottomPaddingRoot : classes.root}
        >
          <CssBaseline />
          <ProfileDialog />
          <WhichPhaseDialog />
          <DeleteExerciseDrawer />
          <CountdownTimer />

          <main>
            <div>{children}</div>
          </main>

          <BottomAppBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
  bottomPadding: boolean;
}

export default withStyles(styles, { withTheme: true })(App);
