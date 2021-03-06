import { WorkoutActionTypes } from '../actions-workout';
import { WorkoutCategoryVO, RoutineTemplateVO } from 'workout-app-common-core';
import { PhaseTypeEditingSegment } from '../../configs/types';

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

export interface OpenEditPreviewOptionsAction {
  type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS;
}

export const openEditPreviewOptions = (): OpenEditPreviewOptionsAction => {
  return {
    type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS,
  };
};

export interface ToggleEditOptionButtonsAction {
  type: WorkoutActionTypes.TOGGLE_EDIT_OPTION_BUTTONS;
  props: {
    open: boolean;
    onlyDisplayDelete: boolean;
  };
}

export const toggleEditOptionButtons = (props: {
  open: boolean;
  onlyDisplayDelete: boolean;
}): ToggleEditOptionButtonsAction => {
  return {
    type: WorkoutActionTypes.TOGGLE_EDIT_OPTION_BUTTONS,
    props: props,
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

export interface CheckIfPhaseSelectionRequiredAction {
  type: WorkoutActionTypes.CHECK_IF_PHASE_SELECTION_REQUIRED;
  phaseType: PhaseTypeEditingSegment;
}

export const checkIfPhaseSelectionRequired = (
  phaseType: PhaseTypeEditingSegment
): CheckIfPhaseSelectionRequiredAction => {
  return {
    type: WorkoutActionTypes.CHECK_IF_PHASE_SELECTION_REQUIRED,
    phaseType: phaseType,
  };
};

export interface CloseUpdatePhaseIdToAddNewSegmentAction {
  type: WorkoutActionTypes.CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT;
  phaseId: string;
}

export const closeAndUpdatePhaseIdToAddNewSegment = (
  phaseId: string
): CloseUpdatePhaseIdToAddNewSegmentAction => {
  return {
    type: WorkoutActionTypes.CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT,
    phaseId: phaseId,
  };
};
