import { WorkoutActionTypes } from '../actions-workout';
import { DeleteExerciseDrawerActionProps } from '../../configs/types';

export interface DeleteSelectedSegmentFromRoutineAction {
  type: WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE;
  segmentId: string;
}

export const deleteSelectedSegmentFromRoutine = (
  segmentId: string
): DeleteSelectedSegmentFromRoutineAction => {
  return {
    type: WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE,
    segmentId: segmentId,
  };
};

export interface ToggleDeleteExerciseDrawerAction {
  type: WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER;
  props: DeleteExerciseDrawerActionProps;
}

export const toggleDeleteExerciseDrawer = (
  props: DeleteExerciseDrawerActionProps
): ToggleDeleteExerciseDrawerAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER,
    props: props,
  };
};
