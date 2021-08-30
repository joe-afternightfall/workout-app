import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import WorkoutSwipeableViews from './WorkoutSwipeableViews';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MobileWorkoutScreen extends Component<MobileWorkoutScreenProps> {
  render(): JSX.Element {
    // const { classes } = this.props;

    return (
      <Grid container justify={'center'} spacing={2}>
        <Grid item xs={12}>
          <WorkoutSwipeableViews />
        </Grid>
      </Grid>
    );
  }
}

export type MobileWorkoutScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MobileWorkoutScreen);
