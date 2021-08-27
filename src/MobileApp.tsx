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
import MobileAppBar from './components/app-shell/MobileAppBar';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  mobileRoot: {},
});

class MobileApp extends Component<MobileAppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.mobileRoot}>
          <CssBaseline />
          <MobileAppBar />
          <div>{this.props.children}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface MobileAppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

export default withStyles(styles, { withTheme: true })(MobileApp);
