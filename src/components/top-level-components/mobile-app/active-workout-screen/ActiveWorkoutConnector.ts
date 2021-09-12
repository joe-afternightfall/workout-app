import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ActiveWorkout, {
  ActiveSetInfo,
  ActiveWorkoutProps,
} from './ActiveWorkout';
import { State } from '../../../../configs/redux/store';
import { getPhaseName } from '../../../../utils/workout-configs';
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
  const phaseName = getPhaseName(
    state.workoutState.configs.phases,
    state.workoutState.currentPhase.phaseId
  );

  const allExercises = state.workoutState.configs.exercises;
  const currentSegmentIndex = state.workoutState.currentSegmentIndex;
  const currentPhase = state.workoutState.currentPhase;

  const totalSegments = currentPhase.segments.length;
  const currentSegment = currentPhase.segments.find(
    (segment: Segment) => segment.order === currentSegmentIndex
  );

  let lastSegment = false;
  let superset = false;
  let straightSet = false;

  if (currentSegment) {
    lastSegment = currentSegment.order === totalSegments;
    superset = isSuperset(currentSegment.trainingSetTypeId);
    straightSet = isStraightSet(currentSegment.trainingSetTypeId);
  }

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
    phaseName: phaseName, // done, need it
    allExercises: state.workoutState.configs.exercises,
    currentSegmentIndex: state.workoutState.currentSegmentIndex,
    currentSetIndex: state.workoutState.currentSetIndex,
    currentSegment: currentSegment,
    totalSegments: totalSegments,
    straightSet: straightSet,
    superset: superset,
    lastSegment: lastSegment,
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
