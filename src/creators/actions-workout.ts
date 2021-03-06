import { LocationChangeAction } from 'connected-react-router';
import {
  SelectedRoutineAction,
  SelectedWorkoutCategoryAction,
  StartWorkoutAction,
  ToggleEditOptionButtonsAction,
  OpenEditSetAction,
  CloseEditSetAction,
  CopyRoutineForEditAction,
  OpenEditPreviewOptionsAction,
  ToggleExerciseWidgetOnRoutinePreviewPageAction,
  CheckIfPhaseSelectionRequiredAction,
  CloseUpdatePhaseIdToAddNewSegmentAction,
} from './workout/workout-selections';
import {
  ClearActiveWorkoutAction,
  CloseCountdownTimerAction,
  MarkCurrentSetAsDoneAction,
  OpenCountdownTimerForAction,
  StartSelectedSegmentAction,
  WorkoutDoneAction,
} from './workout/active-workout';
import {
  AddExerciseToNewStraightSetAction,
  AddExerciseToNewSuperSetAction,
  AddSetToRoutineCopyAction,
  DeleteSetFromRoutineCopyAction,
  SaveEditedVersionOfRoutineAction,
} from './workout/preview-workout';
import {
  UpdateRestBetweenAction,
  UpdateSegmentOrderAction,
  UpdateSetTextFieldAction,
} from './workout/update-workout';
import {
  DeleteSelectedSegmentFromRoutineAction,
  ToggleDeleteExerciseDrawerAction,
} from './workout/delete-exercise-drawer';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
  SELECTED_WORKOUT_CATEGORY = 'SELECTED_WORKOUT_CATEGORY',
  SELECTED_ROUTINE = 'SELECTED_ROUTINE',
  START_WORKOUT = 'START_WORKOUT',
  MARK_CURRENT_SET_AS_DONE = 'MARK_CURRENT_SET_AS_DONE',
  OPEN_COUNTDOWN_TIMER_FOR = 'OPEN_COUNTDOWN_TIMER_FOR',
  CLOSE_COUNTDOWN_TIMER = 'CLOSE_COUNTDOWN_TIMER',
  TOGGLE_EDIT_OPTION_BUTTONS = 'TOGGLE_EDIT_OPTION_BUTTONS',
  OPEN_EDIT_PREVIEW_OPTIONS = 'OPEN_EDIT_PREVIEW_OPTIONS',
  OPEN_EDIT_SET = 'OPEN_EDIT_SET',
  CLOSE_EDIT_SET = 'CLOSE_EDIT_SET',
  COPY_ROUTINE_FOR_EDIT = 'COPY_ROUTINE_FOR_EDIT',
  DELETE_SET_FROM_ROUTINE_COPY = 'DELETE_SET_FROM_ROUTINE_COPY',
  ADD_SET_TO_ROUTINE_COPY = 'ADD_SET_TO_ROUTINE_COPY',
  SAVE_EDITED_VERSION_OF_ROUTINE = 'SAVE_EDITED_VERSION_OF_ROUTINE',
  UPDATE_SET_TEXT_FIELD = 'UPDATE_SET_TEXT_FIELD',
  UPDATE_SEGMENT_ORDER = 'UPDATE_SEGMENT_ORDER',
  UPDATE_REST_BETWEEN = 'UPDATE_REST_BETWEEN',
  WORKOUT_DONE = 'WORKOUT_DONE',
  CLEAR_ACTIVE_WORKOUT = 'CLEAR_ACTIVE_WORKOUT',
  START_SELECTED_SEGMENT = 'START_SELECTED_SEGMENT',
  TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE = 'TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE',
  ADD_EXERCISE_TO_NEW_SUPER_SET = 'ADD_EXERCISE_TO_NEW_SUPER_SET',
  ADD_EXERCISE_TO_NEW_STRAIGHT_SET = 'ADD_EXERCISE_TO_NEW_STRAIGHT_SET',
  CHECK_IF_PHASE_SELECTION_REQUIRED = 'CHECK_IF_PHASE_SELECTION_REQUIRED',
  CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT = 'CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT',
  DELETE_SELECTED_SEGMENT_FROM_ROUTINE = 'DELETE_SELECTED_SEGMENT_FROM_ROUTINE',
  TOGGLE_DELETE_EXERCISE_DRAWER = 'TOGGLE_DELETE_EXERCISE_DRAWER',
}

export type WorkoutActions =
  | LocationChangeAction
  | SelectedWorkoutCategoryAction
  | SelectedRoutineAction
  | StartWorkoutAction
  | MarkCurrentSetAsDoneAction
  | ToggleEditOptionButtonsAction
  | OpenEditSetAction
  | CloseEditSetAction
  | CopyRoutineForEditAction
  | DeleteSetFromRoutineCopyAction
  | OpenEditPreviewOptionsAction
  | AddSetToRoutineCopyAction
  | SaveEditedVersionOfRoutineAction
  | UpdateSetTextFieldAction
  | UpdateSegmentOrderAction
  | UpdateRestBetweenAction
  | WorkoutDoneAction
  | StartSelectedSegmentAction
  | ClearActiveWorkoutAction
  | AddExerciseToNewStraightSetAction
  | AddExerciseToNewSuperSetAction
  | ToggleExerciseWidgetOnRoutinePreviewPageAction
  | CheckIfPhaseSelectionRequiredAction
  | CloseUpdatePhaseIdToAddNewSegmentAction
  | DeleteSelectedSegmentFromRoutineAction
  | ToggleDeleteExerciseDrawerAction
  | OpenCountdownTimerForAction
  | CloseCountdownTimerAction;
