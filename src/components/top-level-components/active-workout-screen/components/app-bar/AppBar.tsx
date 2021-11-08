import React from 'react';
import { connect } from 'react-redux';
import ExitDialog from './exit-dialog/ExitDialog';
import { State } from '../../../../../configs/redux/store';
import { getPhaseName } from '../../../../../utils/name-finder';
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import ExerciseListDrawer from './active-exercise-list-drawer/ActiveExerciseListDrawer';
import { Variant } from '@material-ui/core/styles/createTypography';

const endSection = (element: JSX.Element) => {
  return (
    <Grid item xs={2} container justify={'center'} alignItems={'center'}>
      {element}
    </Grid>
  );
};

const headerTitle = (text: string, variant: Variant) => {
  return (
    <Grid item xs={12} container justify={'center'} alignItems={'flex-end'}>
      <Typography variant={variant}>{text}</Typography>
    </Grid>
  );
};

const ActiveWorkoutAppBar = (props: ActiveWorkoutAppBarProps): JSX.Element => {
  const { phaseName, currentSegmentCount } = props;

  return (
    <AppBar position={'absolute'} color={'transparent'} elevation={0}>
      <Toolbar disableGutters>
        <Grid container>
          {endSection(<ExitDialog />)}
          <Grid item xs={8}>
            {headerTitle(phaseName, 'overline')}
            {headerTitle(currentSegmentCount, 'subtitle1')}
          </Grid>
          {endSection(<ExerciseListDrawer />)}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface ActiveWorkoutAppBarProps {
  phaseName: string;
  currentSegmentCount: string;
}

const mapStateToProps = (state: State): ActiveWorkoutAppBarProps => {
  const totalSegments = state.workoutState.currentPhase.segments.length;
  const currentSegmentIndex = state.workoutState.currentSegmentIndex;

  return {
    phaseName: getPhaseName(
      state.applicationState.workoutConfigurations.phases,
      state.workoutState.currentPhase.phaseId
    ),
    currentSegmentCount: `${currentSegmentIndex} of ${totalSegments}`,
  } as unknown as ActiveWorkoutAppBarProps;
};

export default connect(mapStateToProps)(ActiveWorkoutAppBar);
