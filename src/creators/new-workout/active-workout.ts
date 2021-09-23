import { WorkoutActionTypes } from '../actions-workout';

export interface MarkCurrentSetAsDoneAction {
  type: WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE;
  segmentId: string;
  setNumber: number;
  lastSet: boolean;
  lastSegment: boolean;
}

export const markCurrentSetAsDone = (
  segmentId: string,
  setNumber: number,
  lastSet: boolean,
  lastSegment: boolean
): MarkCurrentSetAsDoneAction => {
  return {
    type: WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE,
    segmentId: segmentId,
    setNumber: setNumber,
    lastSet: lastSet,
    lastSegment: lastSegment,
  };
};

export interface WorkoutDoneAction {
  type: WorkoutActionTypes.WORKOUT_DONE;
}

export const workoutDone = (): WorkoutDoneAction => {
  return {
    type: WorkoutActionTypes.WORKOUT_DONE,
  };
};
