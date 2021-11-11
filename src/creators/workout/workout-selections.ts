import { WorkoutActionTypes } from '../actions-workout';
import { WorkoutCategoryVO, RoutineTemplateVO } from 'workout-app-common-core';

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

export interface OpenEditPreviewOptionsAction {
  type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS;
}

export const openEditPreviewOptions = (): OpenEditPreviewOptionsAction => {
  return {
    type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS,
  };
};

export const toggleEditPreviewOptions = (
  display: boolean
): ToggleEditPreviewOptionsAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_EDIT_PREVIEW_LIST,
    display: display,
  };
};

export interface OpenEditSetAction {
  type: WorkoutActionTypes.OPEN_EDIT_SET;
  segmentId: string;
}

export const openEditSet = (segmentId: string): OpenEditSetAction => {
  return {
    type: WorkoutActionTypes.OPEN_EDIT_SET,
    segmentId: segmentId,
  };
};

export interface CloseEditSetAction {
  type: WorkoutActionTypes.CLOSE_EDIT_SET;
}

export const closeEditSet = (): CloseEditSetAction => {
  return {
    type: WorkoutActionTypes.CLOSE_EDIT_SET,
  };
};

export interface CopyRoutineForEditAction {
  type: WorkoutActionTypes.COPY_ROUTINE_FOR_EDIT;
}

export const copyRoutineForEdit = (): CopyRoutineForEditAction => {
  return {
    type: WorkoutActionTypes.COPY_ROUTINE_FOR_EDIT,
  };
};

export interface ToggleExerciseWidgetOnRoutinePreviewPageAction {
  type: WorkoutActionTypes.TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE;
  open: boolean;
}

export const toggleExerciseWidgetOnRoutinePreviewPage = (
  open: boolean
): ToggleExerciseWidgetOnRoutinePreviewPageAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE,
    open: open,
  };
};
