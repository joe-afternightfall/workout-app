import {
  Segment,
  BuiltSets,
  isSuperset,
  isStraightSet,
  isCircuitSet,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../configs/redux/store';
import { buildSetInfo } from '../../../../utils/active-workout';
import ActiveWorkout, { ActiveWorkoutProps } from './ActiveWorkout';
import { saveWorkoutForUser } from '../../../../services/user-profile';
import { MOBILE_WORKOUT_DONE_PATH } from '../../../../configs/constants/app';
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
    currentSetIndex: state.workoutState.currentSetIndex,
    currentSegment: currentSegment,
    straightSet:
      currentSegment && isStraightSet(currentSegment.trainingSetTypeId),
    superset: currentSegment && isSuperset(currentSegment.trainingSetTypeId),
    circuitSet:
      currentSegment && isCircuitSet(currentSegment.trainingSetTypeId),
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
      lastSegment: boolean,
      lastExerciseOfWorkout: boolean
    ) => {
      // todo: try using ownProps here and not have to pass in lastSegment or lastExercise
      dispatch(
        markCurrentSetAsDone(segmentId, setNumber, lastSet, lastSegment)
      );
      if (lastExerciseOfWorkout && lastSet) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveWorkoutForUser(MOBILE_WORKOUT_DONE_PATH)
        );
      }
    },
  } as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
