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
import { MarkCurrentSetAsDoneAction } from './new-workout/active-workout';
import {
  AddSetToEditingCopyAction,
  DeleteSegmentFromRoutineCopyAction,
  DeleteSetFromEditingCopyAction,
  SaveEditedVersionOfRoutineAction,
} from './new-workout/preview-workout';
import { UpdateSetTextFieldAction } from './new-workout/update-workout';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
  SELECTED_WORKOUT_CATEGORY = 'SELECTED_WORKOUT_CATEGORY',
  SELECTED_ROUTINE = 'SELECTED_ROUTINE',
  START_WORKOUT = 'START_WORKOUT',
  MARK_CURRENT_SET_AS_DONE = 'MARK_CURRENT_SET_AS_DONE',
  TOGGLE_EDIT_PREVIEW_LIST = 'TOGGLE_EDIT_PREVIEW_LIST',
  OPEN_EDIT_PREVIEW_OPTIONS = 'OPEN_EDIT_PREVIEW_OPTIONS',
  OPEN_EDIT_SET = 'OPEN_EDIT_SET',
  CLOSE_EDIT_SET = 'CLOSE_EDIT_SET',
  COPY_ROUTINE_FOR_EDIT = 'COPY_ROUTINE_FOR_EDIT',
  // TODO:  rename the below vars to from_routine_copy
  DELETE_SET_FROM_EDITING_COPY = 'DELETE_SET_FROM_EDITING_COPY',
  ADD_SET_TO_EDITING_COPY = 'ADD_SET_TO_EDITING_COPY',
  DELETE_SEGMENT_FROM_ROUTINE_COPY = 'DELETE_SEGMENT_FROM_ROUTINE_COPY',
  SAVE_EDITED_VERSION_OF_ROUTINE = 'SAVE_EDITED_VERSION_OF_ROUTINE',
  UPDATE_SET_TEXT_FIELD = 'UPDATE_SET_TEXT_FIELD',
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
  | DeleteSetFromEditingCopyAction
  | OpenEditPreviewOptionsAction
  | AddSetToEditingCopyAction
  | DeleteSegmentFromRoutineCopyAction
  | SaveEditedVersionOfRoutineAction
  | UpdateSetTextFieldAction;
