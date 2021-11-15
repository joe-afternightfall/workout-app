import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { State } from '../../../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { WorkoutCategoryVO } from 'workout-app-common-core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditSet from '../3-preview-workout/components/edit-set/EditSet';
import WorkoutScreensAppBar from '../shared-components/WorkoutScreensAppBar';
import { ROUTINES_SCREEN_PATH } from '../../../../configs/constants/app-routing';
import { selectedWorkoutCategory } from '../../../../creators/workout/workout-selections';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '7vh',
    },
  })
);

const BaseWorkoutScreen = (
  props: BaseWorkoutScreenProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { centerComponent } = props;

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        {!props.displayEditSet && (
          <>
            <WorkoutScreensAppBar />
            <div className={classes.toolbar} />
          </>
        )}

        {centerComponent}

        {/*// todo: rip <EditSet /> out to app shell*/}
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
  workoutCategories: WorkoutCategoryVO[];
  selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => void;
}

const mapStateToProps = (state: State): BaseWorkoutScreenProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
    workoutCategories:
      state.applicationState.workoutConfigurations.workoutCategories,
  } as unknown as BaseWorkoutScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BaseWorkoutScreenProps =>
  ({
    selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => {
      dispatch(selectedWorkoutCategory(category));
      dispatch(routerActions.push(ROUTINES_SCREEN_PATH));
    },
  } as unknown as BaseWorkoutScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(BaseWorkoutScreen);
