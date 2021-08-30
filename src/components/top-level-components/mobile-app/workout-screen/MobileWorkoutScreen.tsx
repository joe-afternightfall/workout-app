import React from 'react';
import { Grid } from '@material-ui/core';
import WorkoutSwipeableViews from './views/WorkoutSwipeableViews';
import MessageAppBar from './views/components/MessageAppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

export default function MobileWorkoutScreen(): JSX.Element {

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <WorkoutSwipeableViews />
      </Grid>
    </Grid>
  );
}
