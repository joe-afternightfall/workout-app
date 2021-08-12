import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import Calendar from './Calendar';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    return (
      <Grid xs={12} item container spacing={2}>
        <Grid item xs={12}>
          <span>{'Dashboard'}</span>
        </Grid>
        <Grid item xs={8}>
          <Calendar />
        </Grid>
      </Grid>
    );
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
