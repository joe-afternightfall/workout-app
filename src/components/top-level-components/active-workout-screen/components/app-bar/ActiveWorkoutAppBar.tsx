import React from 'react';
import { connect } from 'react-redux';
import ExitDialog from './exit-dialog/ExitDialog';
import { Grid, Typography } from '@material-ui/core';
import { getPhaseName } from 'workout-app-common-core';
import TopAppBar from '../../../../app-shell/TopAppBar';
import { State } from '../../../../../configs/redux/store';
import { Variant } from '@material-ui/core/styles/createTypography';
import ExerciseListDrawer from './active-exercise-list-drawer/ActiveExerciseListDrawer';

const headerTitle = (text: string, variant: Variant) => {
  return (
    <Grid item xs={12} container justify={'center'} alignItems={'flex-end'}>
      <Typography variant={variant}>{text}</Typography>
    </Grid>
  );
};

const ActiveWorkoutAppBar = (props: ActiveWorkoutAppBarProps): JSX.Element => {
  const { phaseName, displayEditSet, currentSegmentCount } = props;

  return (
    <TopAppBar
      title={
        <>
          {headerTitle(phaseName, 'overline')}
          {headerTitle(currentSegmentCount, 'subtitle1')}
        </>
      }
      hideToolbarMixin={displayEditSet}
      disableGutters
      position={'absolute'}
      color={'transparent'}
      leftButton={<ExitDialog />}
      rightButton={<ExerciseListDrawer />}
    />
  );
};

interface ActiveWorkoutAppBarProps {
  phaseName: string;
  displayEditSet: boolean;
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
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as ActiveWorkoutAppBarProps;
};

export default connect(mapStateToProps)(ActiveWorkoutAppBar);
