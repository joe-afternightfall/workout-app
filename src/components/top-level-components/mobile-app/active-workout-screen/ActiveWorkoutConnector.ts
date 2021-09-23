import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  isSuperset,
  isStraightSet,
  buildSetInfo,
} from '../../../../utils/active-workout';
import { State } from '../../../../configs/redux/store';
import ActiveWorkout, { ActiveWorkoutProps } from './ActiveWorkout';
import { Segment, BuiltSets } from '../../../../configs/models/AppInterfaces';
import { markCurrentSetAsDone } from '../../../../creators/new-workout/active-workout';

const mapStateToProps = (state: State): ActiveWorkoutProps => {
  const allExercises = state.workoutState.configs.exercises;
  const currentPhase = state.workoutState.currentPhase;
  const currentSegment = currentPhase.segments.find(
    (segment: Segment) =>
      segment.order === state.workoutState.currentSegmentIndex
  );

  let builtSets: BuiltSets = {};
  let lastSegment = false;
  let lastExerciseOfWorkout = false;

  if (currentSegment) {
    builtSets = buildSetInfo(currentSegment, allExercises);
    lastSegment = currentSegment.order === currentPhase.segments.length;
    lastExerciseOfWorkout =
      lastSegment &&
      state.workoutState.activeWorkout.routine.phases.length ===
        currentPhase.order;
  }

  return {
    allExercises: state.workoutState.configs.exercises,
    currentSetIndex: state.workoutState.currentSetIndex,
    currentSegment: currentSegment,
    straightSet:
      currentSegment && isStraightSet(currentSegment.trainingSetTypeId),
    superset: currentSegment && isSuperset(currentSegment.trainingSetTypeId),
    lastSegment: currentSegment && lastSegment,
    lastExerciseOfWorkout: lastExerciseOfWorkout,
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
