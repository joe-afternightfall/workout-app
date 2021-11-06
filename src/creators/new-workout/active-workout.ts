import { WorkoutActionTypes } from '../actions-workout';
import { Workout } from 'workout-app-common-core';

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

export interface ClearActiveWorkoutAction {
  type: WorkoutActionTypes.CLEAR_ACTIVE_WORKOUT;
  workout: Workout;
}

export const clearActiveWorkout = (): ClearActiveWorkoutAction => {
  return {
    type: WorkoutActionTypes.CLEAR_ACTIVE_WORKOUT,
    workout: {
      id: '',
      date: '',
      startTime: '',
      endTime: '',
      routine: {
        id: '',
        name: '',
        workoutCategoryId: '',
        phases: [],
      },
    },
  };
};

export interface StartSelectedSegmentAction {
  type: WorkoutActionTypes.START_SELECTED_SEGMENT;
  segmentId: string;
}

export const startSelectedSegment = (
  segmentId: string
): StartSelectedSegmentAction => {
  return {
    type: WorkoutActionTypes.START_SELECTED_SEGMENT,
    segmentId: segmentId,
  };
};
