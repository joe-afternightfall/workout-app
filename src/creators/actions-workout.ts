import { LocationChangeAction } from 'connected-react-router';
import { InitializeWorkoutConfigsAction } from './initialize';
import {
  SelectedRoutineAction,
  SelectedWorkoutCategoryAction,
  StartWorkoutAction,
  ToggleEditPreviewOptionsAction,
  OpenEditSetAction,
  CloseEditSetAction,
  CopyRoutineForEditAction,
  OpenEditPreviewOptionsAction,
} from './new-workout/workout-selections';
import {
  MarkCurrentSetAsDoneAction,
  StartSelectedSegmentAction,
  WorkoutDoneAction,
} from './new-workout/active-workout';
import {
  AddSetToRoutineCopyAction,
  DeleteSegmentFromRoutineCopyAction,
  DeleteSetFromRoutineCopyAction,
  SaveEditedVersionOfRoutineAction,
} from './new-workout/preview-workout';
import {
  UpdateRestBetweenAction,
  UpdateSegmentOrderAction,
  UpdateSetTextFieldAction,
} from './new-workout/update-workout';
import { LoadRoutineTemplatesAction } from './new-workout/routine-template';
import { LoadExercisesAction } from './new-workout/exercises';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
  LOAD_ROUTINE_TEMPLATES = 'LOAD_ROUTINE_TEMPLATES',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  SELECTED_WORKOUT_CATEGORY = 'SELECTED_WORKOUT_CATEGORY',
  SELECTED_ROUTINE = 'SELECTED_ROUTINE',
  START_WORKOUT = 'START_WORKOUT',
  MARK_CURRENT_SET_AS_DONE = 'MARK_CURRENT_SET_AS_DONE',
  TOGGLE_EDIT_PREVIEW_LIST = 'TOGGLE_EDIT_PREVIEW_LIST',
  OPEN_EDIT_PREVIEW_OPTIONS = 'OPEN_EDIT_PREVIEW_OPTIONS',
  OPEN_EDIT_SET = 'OPEN_EDIT_SET',
  CLOSE_EDIT_SET = 'CLOSE_EDIT_SET',
  COPY_ROUTINE_FOR_EDIT = 'COPY_ROUTINE_FOR_EDIT',
  DELETE_SET_FROM_ROUTINE_COPY = 'DELETE_SET_FROM_ROUTINE_COPY',
  ADD_SET_TO_ROUTINE_COPY = 'ADD_SET_TO_ROUTINE_COPY',
  DELETE_SEGMENT_FROM_ROUTINE_COPY = 'DELETE_SEGMENT_FROM_ROUTINE_COPY',
  SAVE_EDITED_VERSION_OF_ROUTINE = 'SAVE_EDITED_VERSION_OF_ROUTINE',
  UPDATE_SET_TEXT_FIELD = 'UPDATE_SET_TEXT_FIELD',
  UPDATE_SEGMENT_ORDER = 'UPDATE_SEGMENT_ORDER',
  UPDATE_REST_BETWEEN = 'UPDATE_REST_BETWEEN',
  WORKOUT_DONE = 'WORKOUT_DONE',
  START_SELECTED_SEGMENT = 'START_SELECTED_SEGMENT',
}

export type WorkoutActions =
  | LocationChangeAction
  | InitializeWorkoutConfigsAction
  | SelectedWorkoutCategoryAction
  | SelectedRoutineAction
  | StartWorkoutAction
  | MarkCurrentSetAsDoneAction
  | ToggleEditPreviewOptionsAction
  | OpenEditSetAction
  | CloseEditSetAction
  | CopyRoutineForEditAction
  | DeleteSetFromRoutineCopyAction
  | OpenEditPreviewOptionsAction
  | AddSetToRoutineCopyAction
  | DeleteSegmentFromRoutineCopyAction
  | SaveEditedVersionOfRoutineAction
  | UpdateSetTextFieldAction
  | UpdateSegmentOrderAction
  | UpdateRestBetweenAction
  | WorkoutDoneAction
  | LoadRoutineTemplatesAction
  | LoadExercisesAction
  | StartSelectedSegmentAction;
