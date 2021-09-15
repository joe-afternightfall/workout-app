import { WorkoutActionTypes } from '../actions-workout';
import { WorkoutCategoryVO } from '../../configs/models/configurations/WorkoutCategoryVO';
import { RoutineTemplateVO } from '../../configs/models/workout/RoutineTemplateVO';

export interface SelectedWorkoutCategoryAction {
  type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY;
  category: WorkoutCategoryVO;
}

export const selectedWorkoutCategory = (
  category: WorkoutCategoryVO
): SelectedWorkoutCategoryAction => {
  return {
    type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY,
    category: category,
  };
};

export interface SelectedRoutineAction {
  type: WorkoutActionTypes.SELECTED_ROUTINE;
  routine: RoutineTemplateVO;
}
export const selectedRoutine = (
  routine: RoutineTemplateVO
): SelectedRoutineAction => {
  return {
    type: WorkoutActionTypes.SELECTED_ROUTINE,
    routine: routine,
  };
};

export interface StartWorkoutAction {
  type: WorkoutActionTypes.START_WORKOUT;
}

export const startWorkout = (): StartWorkoutAction => {
  return {
    type: WorkoutActionTypes.START_WORKOUT,
  };
};

export interface ToggleEditPreviewOptionsAction {
  type: WorkoutActionTypes.TOGGLE_EDIT_PREVIEW_LIST;
  display: boolean;
}

export const toggleEditPreviewOptions = (
  display: boolean
): ToggleEditPreviewOptionsAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_EDIT_PREVIEW_LIST,
    display: display,
  };
};

export interface ToggleEditSetAction {
  type: WorkoutActionTypes.TOGGLE_EDIT_SET;
  display: boolean;
  segmentId: string;
}

export const toggleEditSet = (
  display: boolean,
  segmentId: string
): ToggleEditSetAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_EDIT_SET,
    display: display,
    segmentId: segmentId,
  };
};
