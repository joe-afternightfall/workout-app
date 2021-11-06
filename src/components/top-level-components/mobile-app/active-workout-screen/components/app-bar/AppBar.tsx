import React from 'react';
import { connect } from 'react-redux';
import ExitDialog from './exit-dialog/ExitDialog';
import { State } from '../../../../../../configs/redux/store';
import { getPhaseName } from '../../../../../../utils/name-finder';
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import ExerciseListDrawer from './active-exercise-list-drawer/ActiveExerciseListDrawer';

const ActiveWorkoutAppBar = (props: ActiveWorkoutAppBarProps): JSX.Element => {
  const { phaseName, currentSegmentCount } = props;

  return (
    <AppBar position={'absolute'} color={'transparent'} elevation={0}>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs={2} container justify={'center'} alignItems={'center'}>
            <ExitDialog />
          </Grid>

          <Grid item xs={8}>
            <Grid
              item
              xs={12}
              container
              justify={'center'}
              alignItems={'flex-end'}
            >
              <Typography variant={'overline'}>{phaseName}</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              container
              justify={'center'}
              alignItems={'flex-end'}
            >
              <Typography variant={'subtitle1'}>
                {currentSegmentCount}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2} container justify={'center'} alignItems={'center'}>
            <ExerciseListDrawer />
          </Grid>
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
      state.workoutState.configs.phases,
      state.workoutState.currentPhase.phaseId
    ),
    currentSegmentCount: `${currentSegmentIndex} of ${totalSegments}`,
  } as unknown as ActiveWorkoutAppBarProps;
};

export default connect(mapStateToProps)(ActiveWorkoutAppBar);
