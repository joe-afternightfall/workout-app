import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import {
  isSuperset,
  getExercise,
  isStraightSet,
  getExerciseName,
} from '../../../../utils/active-workout';
import { Grid, Slide } from '@material-ui/core';
import {
  Set,
  Phase,
  WorkoutExercise,
  WorkoutDuration,
  WorkoutDistance,
} from '../../../../configs/models/AppInterfaces';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/AppBar';
import { State } from '../../../../configs/redux/store';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import { getPhaseName } from '../../../../utils/workout-configs';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveSuperset from './2-active-set/components/ActiveSuperset';
import { WorkoutDAO } from '../../../../configs/models/workout/WorkoutDAO';
import ActiveStraightSet from './2-active-set/components/ActiveStraightSet';
import { ExerciseVO } from '../../../../configs/models/configurations/ExerciseVO';
import { markCurrentSetAsDone } from '../../../../creators/new-workout/active-workout';

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
  segmentId: string;
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
  const currentSegment = props.currentPhase.segments.find(
    (segment) => segment.order === props.currentSegmentIndex
  );

  let lastSegment = false;
  let superset = false;
  let straightSet = false;

  if (currentSegment) {
    lastSegment = currentSegment.order === totalSegments;
    superset = isSuperset(currentSegment.trainingSetTypeId);
    straightSet = isStraightSet(currentSegment.trainingSetTypeId);
  }

  const scrollToSection = () => {
    scroller.scrollTo('third-set-row', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const builtSets: BuiltSets = {};

  currentSegment &&
    currentSegment.exercises.map((exercise: WorkoutExercise) => {
      return exercise.sets.map((set: Set) => {
        const exerciseSet = {
          setNumber: set.setNumber,
          setId: set.id,
          segmentId: currentSegment && currentSegment.id,
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
              exerciseTitles={
                currentSegment
                  ? currentSegment.exercises.map(
                      (exercise: WorkoutExercise) => {
                        return {
                          title: getExerciseName(
                            props.allExercises,
                            exercise.exerciseId
                          ),
                        };
                      }
                    )
                  : []
              }
            />
          </Grid>

          <Grid item xs={12}>
            {superset && (
              <ActiveSuperset
                lastSegment={lastSegment}
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={props.didItClickHandler}
              />
            )}
            {straightSet && (
              <ActiveStraightSet
                lastSegment={lastSegment}
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={props.didItClickHandler}
              />
            )}
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
  currentSegmentIndex: number;
  currentSetIndex: number;
  didItClickHandler: (
    segmentId: string,
    setNumber: number,
    lastSet: boolean,
    lastSegment: boolean
  ) => void;
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
    currentSegmentIndex: state.workoutState.currentSegmentIndex,
    currentSetIndex: state.workoutState.currentSetIndex,
  } as unknown as ActiveWorkoutProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutProps =>
  ({
    didItClickHandler: (
      segmentId: string,
      setNumber: number,
      lastSet: boolean,
      lastSegment: boolean
    ) => {
      dispatch(
        markCurrentSetAsDone(segmentId, setNumber, lastSet, lastSegment)
      );
    },
  } as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
