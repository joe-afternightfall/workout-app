import { LocationChangeAction } from 'connected-react-router';
import {
  ClearUserInfoAction,
  LoadUserInfoAction,
  SetupNewUserAction,
  ToggleUserProfileDialogAction,
  ValidatedUserAction,
} from './user-info';
import {
  LoadExercisesAction,
  LoadGripTypesAction,
  LoadGripWidthsAction,
  LoadManikinMuscleGroupsAction,
  LoadMusclesAction,
  LoadMuscleTargetTypesAction,
  LoadParameterTypesAction,
  LoadPhasesAction,
  LoadRoutineTemplatesAction,
  LoadTrainingSetTypesAction,
  LoadWorkoutCategoriesAction,
  LoadWorkoutEquipmentAction,
} from './load-workout-configs';
import { LoadExerciseImagesAction } from './load-workout-configs';
import {
  FilterExercisesForEquipmentIdAction,
  FilterExercisesForSearchValueAction,
} from './workout/exercises';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  CLEAR_USER_INFO = 'CLEAR_USER_INFO',

  TOGGLE_USER_PROFILE_DIALOG = 'TOGGLE_USER_PROFILE_DIALOG',
  LOAD_USER_INFO = 'LOAD_USER_INFO',
  VALIDATED_USER = 'VALIDATED_USER',
  SETUP_NEW_USER = 'SETUP_NEW_USER',

  LOAD_ROUTINE_TEMPLATES = 'LOAD_ROUTINE_TEMPLATES',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_GRIP_TYPES = 'LOAD_GRIP_TYPES',
  LOAD_GRIP_WIDTHS = 'LOAD_GRIP_WIDTHS',
  LOAD_MANIKIN_MUSCLE_GROUP = 'LOAD_MANIKIN_MUSCLE_GROUP',
  LOAD_MUSCLES = 'LOAD_MUSCLES',
  LOAD_MUSCLE_TARGET_TYPES = 'LOAD_MUSCLE_TARGET_TYPES',
  LOAD_PARAMETER_TYPES = 'LOAD_PARAMETER_TYPES',
  LOAD_PHASES = 'LOAD_PHASES',
  LOAD_TRAINING_SET_TYPES = 'LOAD_TRAINING_SET_TYPES',
  LOAD_WORKOUT_CATEGORIES = 'LOAD_WORKOUT_CATEGORIES',
  LOAD_WORKOUT_EQUIPMENT = 'LOAD_WORKOUT_EQUIPMENT',
  LOAD_EXERCISE_IMAGES = 'LOAD_EXERCISE_IMAGES',
  FILTER_EXERCISES_FOR_SEARCH_VALUE = 'FILTER_EXERCISES_FOR_SEARCH_VALUE',
  FILTER_EXERCISES_FOR_EQUIPMENT_ID = 'FILTER_EXERCISES_FOR_EQUIPMENT_ID',
}

export type ApplicationActions =
  | LocationChangeAction
  | ClearUserInfoAction
  | ToggleUserProfileDialogAction
  | LoadUserInfoAction
  | ValidatedUserAction
  | SetupNewUserAction
  | LoadExercisesAction
  | LoadGripTypesAction
  | LoadGripWidthsAction
  | LoadManikinMuscleGroupsAction
  | LoadMusclesAction
  | LoadMuscleTargetTypesAction
  | LoadParameterTypesAction
  | LoadPhasesAction
  | LoadRoutineTemplatesAction
  | LoadTrainingSetTypesAction
  | LoadWorkoutCategoriesAction
  | LoadWorkoutEquipmentAction
  | LoadExerciseImagesAction
  | FilterExercisesForSearchValueAction
  | FilterExercisesForEquipmentIdAction;
