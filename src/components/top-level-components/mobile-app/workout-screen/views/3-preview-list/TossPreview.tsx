import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { routerActions } from 'connected-react-router';
import { Button } from '@material-ui/core';
import { MOBILE_ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../configs/constants/app';
import SingleListItem from '../../../shared/SingleListItem';
import WorkoutListDivider from '../../../shared/WorkoutListDivider';
import SuperSetItem from '../../../shared/SuperSetItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '83vh',
    },
    listWrapper: {
      height: '100%',
      width: '100%',
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
    },
    startButton: {
      height: '6vh',
      width: '100%',
      background: 'orange',
      position: 'fixed',
      bottom: 0,
    },
  })
);

const WorkoutPreview = (props: WorkoutPreviewProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.listWrapper}>
        <SingleListItem
          exerciseTitle={'Downward Dog'}
          repsAndSets={'5 reps | 5 reps | 5 reps'}
        />
        <WorkoutListDivider />
        <SuperSetItem
          firstExerciseTitle={'Mountain Climbers'}
          firstExerciseRepsAndSets={'10 reps | 8 reps | 6 reps | 4 reps'}
          // firstExerciseIcon={}
          secondExerciseTitle={'Jumping Jacks'}
          secondExerciseRepsAndSets={'20 reps | 38 reps | 46 reps | 54 reps'}
          // secondExerciseIcon={}
        />
        <WorkoutListDivider />
        <SuperSetItem
          firstExerciseTitle={'Mountain Climbers'}
          firstExerciseRepsAndSets={'10 reps | 8 reps | 6 reps | 4 reps'}
          // firstExerciseIcon={}
          secondExerciseTitle={'Jumping Jacks'}
          secondExerciseRepsAndSets={'20 reps | 38 reps | 46 reps | 54 reps'}
          // secondExerciseIcon={}
        />
        <WorkoutListDivider />
        <SingleListItem
          exerciseTitle={'Downward Dog'}
          repsAndSets={'5 reps | 5 reps | 5 reps'}
        />
        <WorkoutListDivider />
        <SingleListItem
          exerciseTitle={'Downward Dog'}
          repsAndSets={'5 reps | 5 reps | 5 reps'}
        />
        <WorkoutListDivider />
        <SuperSetItem
          firstExerciseTitle={'Mountain Climbers'}
          firstExerciseRepsAndSets={'10 reps | 8 reps | 6 reps | 4 reps'}
          // firstExerciseIcon={}
          secondExerciseTitle={'Jumping Jacks'}
          secondExerciseRepsAndSets={'20 reps | 38 reps | 46 reps | 54 reps'}
          // secondExerciseIcon={}
        />
      </List>

      <Button className={classes.startButton} onClick={props.routeClickHandler}>
        {'Start Workout'}
      </Button>
    </div>
  );
};

export interface WorkoutPreviewProps {
  routeClickHandler: () => void;
}

const mapStateToProps = (): WorkoutPreviewProps => {
  return {} as unknown as WorkoutPreviewProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutPreviewProps =>
  ({
    routeClickHandler: () => {
      dispatch(routerActions.push(MOBILE_ACTIVE_WORKOUT_SCREEN_PATH));
    },
  } as unknown as WorkoutPreviewProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPreview);
