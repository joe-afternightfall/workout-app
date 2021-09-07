import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { Grid, Slide } from '@material-ui/core';
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
  WorkoutDuration,
  WorkoutDistance,
} from '../../../../configs/models/AppInterfaces';
import { ExerciseVO } from '../../../../configs/models/configurations/ExerciseVO';
import {
  getExercise,
  getExerciseName,
  isSuperset,
} from '../../../../utils/active-workout';
import ActiveSuperset from './2-active-set/components/ActiveSuperset';
import { getPhaseName } from '../../../../utils/workout-configs';

const useStyles = makeStyles(() =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
  })
);

export interface ActiveSetInfo {
  setNumber: number;
  setId: string;
  exercise: ExerciseVO | undefined;
  exerciseOrder: number;
  weight: number;
  reps: number;
  duration: WorkoutDuration;
  distance: WorkoutDistance;
  markedDone: boolean;
}

export interface BuiltSets {
  [key: number]: ActiveSetInfo[];
}

const ActiveWorkout = (props: ActiveWorkoutProps): JSX.Element => {
  const classes = useStyles();
  const totalSegments = props.currentPhase.segments.length;
  const lastSegment = props.currentSegmentIndex === totalSegments;
  const firstPhase = props.currentPhase.order === 1;

  const superset = isSuperset(props.currentSegment.trainingSetTypeId);

  const scrollToSection = () => {
    scroller.scrollTo('third-set-row', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const builtSets: BuiltSets = {};

  props.currentSegment.exercises.map((exercise: WorkoutExercise) => {
    return exercise.sets.map((set: Set) => {
      const exerciseSet = {
        setNumber: set.setNumber,
        setId: set.id,
        exercise: getExercise(props.allExercises, exercise.exerciseId),
        exerciseOrder: exercise.order,
        weight: set.weight,
        reps: set.reps,
        duration: set.duration,
        distance: set.distance,
        markedDone: set.markedDone,
      };

      builtSets[set.setNumber]
        ? (builtSets[set.setNumber] = [
            ...builtSets[set.setNumber],
            exerciseSet,
          ])
        : (builtSets[set.setNumber] = [exerciseSet]);
    });
  });

  const didItClickHandler = () => {
    // todo: scrollToSection
    // todo: mark set as done
    // todo: increment currentSetIndex
    // todo: if last set reset currentSetIndex to 1
    // todo: if last set increment currentSegmentIndex
    // todo: if last segment reset all and increment to next phase
  };

  const segmentLength = props.currentPhase.segments.length;
  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <ActiveWorkoutAppBar
          currentSegmentCount={`${props.currentSegmentIndex}/${segmentLength}`}
          phaseTitle={props.phaseName}
        />

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            <ActiveExercise
              superset={superset}
              exerciseTitles={props.currentSegment.exercises.map(
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
            {superset ? (
              <ActiveSuperset
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
              />
            ) : undefined}
          </Grid>

          {/*todo: add logic for displaying message when done with first phase and there is another phase after*/}
          {lastSegment ? (
            <React.Fragment />
          ) : (
            <Grid
              item
              xs={12}
              container
              alignItems={'flex-end'}
              style={{ height: '28vh' }}
            >
              <UpNextCard />
            </Grid>
          )}
        </Grid>
      </div>
    </Slide>
  );
};

interface ActiveWorkoutProps {
  phaseName: string;
  activeWorkout: WorkoutDAO;
  allExercises: ExerciseVO[];
  currentPhase: Phase;
  currentSegment: Segment;
  currentSegmentIndex: number;
  currentSetIndex: number;
}

const mapStateToProps = (state: State): ActiveWorkoutProps => {
  const phaseName = getPhaseName(
    state.workoutState.configs.phases,
    state.workoutState.currentPhase.phaseId
  );
  return {
    phaseName: phaseName,
    activeWorkout: state.workoutState.activeWorkout,
    allExercises: state.workoutState.configs.exercises,
    currentPhase: state.workoutState.currentPhase,
    currentSegment: state.workoutState.currentSegment,
    currentSegmentIndex: state.workoutState.currentSegmentIndex,
    currentSetIndex: state.workoutState.currentSetIndex,
  } as unknown as ActiveWorkoutProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutProps =>
  ({} as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
