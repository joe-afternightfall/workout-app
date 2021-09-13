import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ActiveWorkout, {
  ActiveSetInfo,
  ActiveWorkoutProps,
} from './ActiveWorkout';
import { State } from '../../../../configs/redux/store';
import { markCurrentSetAsDone } from '../../../../creators/new-workout/active-workout';
import {
  getExercise,
  isStraightSet,
  isSuperset,
} from '../../../../utils/active-workout';
import {
  Segment,
  Set,
  WorkoutExercise,
} from '../../../../configs/models/AppInterfaces';

export interface BuiltSets {
  [key: number]: ActiveSetInfo[];
}

const mapStateToProps = (state: State): ActiveWorkoutProps => {
  const allExercises = state.workoutState.configs.exercises;
  const currentPhase = state.workoutState.currentPhase;
  const currentSegment = currentPhase.segments.find(
    (segment: Segment) =>
      segment.order === state.workoutState.currentSegmentIndex
  );

  const builtSets: BuiltSets = {};

  currentSegment &&
    currentSegment.exercises.map((exercise: WorkoutExercise) => {
      return exercise.sets.map((set: Set) => {
        const exerciseSet = {
          setNumber: set.setNumber,
          setId: set.id,
          segmentId: currentSegment && currentSegment.id,
          exercise: getExercise(allExercises, exercise.exerciseId),
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

  return {
    allExercises: state.workoutState.configs.exercises,
    currentSetIndex: state.workoutState.currentSetIndex,
    currentSegment: currentSegment,
    straightSet:
      currentSegment && isStraightSet(currentSegment.trainingSetTypeId),
    superset: currentSegment && isSuperset(currentSegment.trainingSetTypeId),
    lastSegment:
      currentSegment && currentSegment.order === currentPhase.segments.length,
    builtSets: builtSets,
  } as unknown as ActiveWorkoutProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutProps =>
  ({
    crushedItClickHandler: (
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
