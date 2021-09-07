import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { Grid, Slide } from '@material-ui/core';
import ActiveSet from './2-active-set/ActiveSet';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/AppBar';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';
import { WorkoutDAO } from '../../../../configs/models/workout/WorkoutDAO';
import {
  Phase,
  Set,
  Segment,
  WorkoutExercise,
} from '../../../../configs/models/AppInterfaces';
import { ExerciseVO } from '../../../../configs/models/configurations/ExerciseVO';
import { getExerciseName, isSuperset } from '../../../../utils/active-workout';

const useStyles = makeStyles(() =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
  })
);

const ActiveWorkout = (props: ActiveWorkoutProps): JSX.Element => {
  const classes = useStyles();
  const [currentPhase, setCurrentPhase] = useState<Phase>(
    props.activeWorkout.routine.phases[0]
  );
  const [currentSegment, setCurrentSegment] = useState<Segment>(
    currentPhase.segments[0]
  );

  const superset = isSuperset(currentSegment.trainingSetTypeId);

  const scrollToSection = () => {
    scroller.scrollTo('third-set-row', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };
  const totalSegments = currentPhase.segments.length;

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <ActiveWorkoutAppBar currentPhase={'blah'} />

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            <ActiveExercise
              superset={superset}
              exerciseTitles={currentSegment.exercises.map(
                (exercise: WorkoutExercise) => {
                  return {
                    title: getExerciseName(
                      props.allExercises,
                      exercise.exerciseId
                    ),
                  };
                }
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {currentSegment.trainingSetTypeId}
            <ActiveSet didItClickHandler={() => alert('clicked')} currentSet />
          </Grid>

          <Grid item xs={12}>
            <ActiveSet
              didItClickHandler={() => alert('clicked')}
              currentSet={false}
            />
          </Grid>

          <Grid
            item
            xs={12}
            container
            alignItems={'flex-end'}
            style={{ height: '28vh' }}
          >
            <UpNextCard />
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

export interface ActiveWorkoutProps {
  activeWorkout: WorkoutDAO;
  allExercises: ExerciseVO[];
}

const mapStateToProps = (state: State): ActiveWorkoutProps => {
  return {
    activeWorkout: state.workoutState.activeWorkout,
    allExercises: state.workoutState.configs.exercises,
  } as unknown as ActiveWorkoutProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutProps =>
  ({} as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
