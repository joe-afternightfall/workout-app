import { WorkoutActionTypes } from '../actions-workout';

export interface MarkCurrentSetAsDoneAction {
  type: WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE;
  segmentId: string;
  setNumber: number;
  lastSet: boolean;
}

export const markCurrentSetAsDone = (
  segmentId: string,
  setNumber: number,
  lastSet: boolean
): MarkCurrentSetAsDoneAction => {
  return {
    type: WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE,
    segmentId: segmentId,
    setNumber: setNumber,
    lastSet: lastSet,
  };
};
