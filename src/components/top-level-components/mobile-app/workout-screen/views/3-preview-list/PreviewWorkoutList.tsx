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
import barbellIcon from '../../../../../../configs/icons/barbell.gif';
import dumbBellIcon from '../../../../../../configs/icons/dumbbell.png';
import bicepHammerCurlOne from '../../../../../../configs/icons/exercises/dumbells/dumbell-bicep-hammer-curl-1.png';
import bicepHammerCurlTwo from '../../../../../../configs/icons/exercises/dumbells/dumbell-bicep-hammer-curl-2.png';
import bicepCurlOne from '../../../../../../configs/icons/exercises/dumbells/dumbell-biceps-curl-1.png';
import bicepCurlTwo from '../../../../../../configs/icons/exercises/dumbells/dumbell-biceps-curl-2.png';
import benchPress from '../../../../../../configs/icons/exercises/barbells/bench-press-barbell.png';
import preacherCurl from '../../../../../../configs/icons/exercises/barbells/preacher-curl-barbell.png';
import inclinePressDumbBells from '../../../../../../configs/icons/exercises/dumbells/incline-press-dumbells.png';
import reverseBentOverRows from '../../../../../../configs/icons/exercises/barbells/reverse-grip-bent-over-rows-barbell.png';

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
    exerciseIcon: {
      height: '13vh',
      margin: 'auto',
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
            equipmentIcon={
              <img style={{ height: 18 }} src={barbellIcon} alt={'barbell'} />
            }
            exerciseIcon={
              <img
                src={benchPress}
                alt={'app-logo'}
                className={classes.exerciseIcon}
              />
            }
            exerciseTitle={'Bench Press'}
            repsAndSets={'80 x 12 | 85 x 12 | 90 x 12'}
          />
          <WorkoutListDivider />
          <SuperSetItem
            firstExerciseTitle={'Incline Press Barbells'}
            firstExerciseRepsAndSets={'90 x 12 | 80 x 12 | 120 x 6'}
            // firstExerciseIcon={}
            secondExerciseTitle={'Jumping Jacks'}
            secondExerciseRepsAndSets={'20 reps | 38 reps | 46 reps | 54 reps'}
            // secondExerciseIcon={}
          />
          <WorkoutListDivider />
          <SingleListItem
            equipmentIcon={
              <img style={{ height: 18 }} src={barbellIcon} alt={'barbell'} />
            }
            exerciseIcon={
              <img
                src={preacherCurl}
                alt={'app-logo'}
                className={classes.exerciseIcon}
              />
            }
            exerciseTitle={'Preacher Curl'}
            repsAndSets={'40 x 12 | 45 x 10 | 50 x 10'}
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
            equipmentIcon={
              <img style={{ height: 18 }} src={barbellIcon} alt={'barbell'} />
            }
            exerciseIcon={
              <img
                src={reverseBentOverRows}
                alt={'app-logo'}
                className={classes.exerciseIcon}
              />
            }
            exerciseTitle={'Downward Dog'}
            repsAndSets={'5 reps | 5 reps | 5 reps'}
          />
          <WorkoutListDivider />
          <SingleListItem
            equipmentIcon={
              <img style={{ height: 18 }} src={barbellIcon} alt={'barbell'} />
            }
            exerciseIcon={
              <img
                src={preacherCurl}
                alt={'app-logo'}
                className={classes.exerciseIcon}
              />
            }
            exerciseTitle={'Preacher Curl'}
            repsAndSets={'40 x 12 | 45 x 10 | 50 x 10'}
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
