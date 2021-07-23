import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import ExerciseCard from './exercises/ExerciseCard';
import MuscleGroupsCard from './muscle-groups/MuscleGroupsCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    return (
      <Grid xs={12} item container spacing={2}>
        <Grid item xs={12}>
          <span>{'Dashboard'}</span>
        </Grid>

        <Grid item xs={6} sm={6}>
          <ExerciseCard />
        </Grid>

        <Grid item xs={6} sm={6}>
          <MuscleGroupsCard />
        </Grid>
      </Grid>
    );
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);
