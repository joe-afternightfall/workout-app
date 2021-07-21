import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import Stopwatch from '../widgets/workout/stopwatch/Stopwatch';
import { Grid, Typography } from '@material-ui/core';
import WorkoutCard from '../widgets/workout/WorkoutCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WorkoutScreen extends Component<WorkoutScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>{'Workout'}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Stopwatch />
        </Grid>

        <Grid item xs={12}>
          <WorkoutCard />
        </Grid>
      </Grid>
    );
  }
}

export type WorkoutScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
