import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { routerActions } from 'connected-react-router';
import { Button, Paper } from '@material-ui/core';
import { MOBILE_ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../configs/constants/app';
import SingleListItem from '../../../shared/SingleListItem';
import WorkoutListDivider from '../../../shared/WorkoutListDivider';
import SuperSetItem from '../../../shared/SuperSetItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '87vh',
    },
    listWrapper: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '6vh',
      backgroundColor: theme.palette.background.paper,
    },
    startButton: {
      borderRadius: 0,
      height: '6vh',
      width: '100%',
      background: '#ed440b',
      position: 'fixed',
      bottom: 0,
    },
  })
);

const PreviewWorkoutList = (props: PreviewWorkoutListProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={5} square>
        <List className={classes.listWrapper}>
          <SingleListItem
            exerciseTitle={'Downward Dog'}
            repsAndSets={'5 reps | 5 reps | 5 reps'}
          />
          <WorkoutListDivider />
          <SuperSetItem
            firstExerciseTitle={'Bench Press'}
            firstExerciseRepsAndSets={'90 x 12 | 80 x 12 | 120 x 6'}
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
          <WorkoutListDivider />
        </List>

        <Button
          className={classes.startButton}
          onClick={props.routeClickHandler}
        >
          {'Start Workout'}
        </Button>
      </Paper>
    </div>
  );
};

export interface PreviewWorkoutListProps {
  routeClickHandler: () => void;
}

const mapStateToProps = (): PreviewWorkoutListProps => {
  return {} as unknown as PreviewWorkoutListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PreviewWorkoutListProps =>
  ({
    routeClickHandler: () => {
      dispatch(routerActions.push(MOBILE_ACTIVE_WORKOUT_SCREEN_PATH));
    },
  } as unknown as PreviewWorkoutListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewWorkoutList);
