import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { State } from '../../../../configs/redux/store';
import EditSet from '../3-preview-workout/components/edit-set/EditSet';
import WorkoutScreensAppBar from '../shared-components/WorkoutScreensAppBar';

const BaseWorkoutScreen = (
  props: BaseWorkoutScreenProps & PassedInProps
): JSX.Element => {
  const { centerComponent } = props;

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        {!props.displayEditSet && <WorkoutScreensAppBar />}

        {centerComponent}

        {props.displayEditSet && <EditSet />}
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  centerComponent: JSX.Element;
}

interface BaseWorkoutScreenProps {
  displayEditSet: boolean;
}

const mapStateToProps = (state: State): BaseWorkoutScreenProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as BaseWorkoutScreenProps;
};

export default connect(mapStateToProps)(BaseWorkoutScreen);
