import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { buildSetInfo } from '../../../../utils/active-workout';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import ActiveWorkout, { ActiveWorkoutProps } from './ActiveWorkout';
import {
  Segment,
  BuiltSets,
  isStraightSet,
  isSuperset,
} from 'workout-app-common-core';
import {
  markCurrentSetAsDone,
  workoutDone,
} from '../../../../creators/new-workout/active-workout';
import { MOBILE_WORKOUT_DONE_PATH } from '../../../../configs/constants/app';
import { saveWorkoutForUser } from '../../../../services/user-profile';
import { ThunkDispatch } from 'redux-thunk';

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
      dispatch(
        markCurrentSetAsDone(segmentId, setNumber, lastSet, lastSegment)
      );
      if (lastExerciseOfWorkout && lastSet) {
        // todo: dispatch one action to save/deem workout done/then clear active routine/then route to directed path
        dispatch(workoutDone());
        dispatch(routerActions.push(MOBILE_WORKOUT_DONE_PATH));
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveWorkoutForUser()
        );
      }
    },
  } as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
