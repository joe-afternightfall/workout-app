import { LocationChangeAction } from 'connected-react-router';
import {
  AddCircuitAction,
  DeleteCircuitAction,
  ToggleAccordionAction,
  UpdateWorkoutDateAction,
  ClearWorkoutScreenAction,
  UpdateTimeSetFieldAction,
  AddExerciseToCircuitAction,
  UpdateWorkoutSetFieldAction,
  ToggleExerciseSetAsDoneAction,
  AddExerciseSetToCircuitAction,
  DeleteExerciseFromCircuitAction,
  DeleteExerciseSetFromCircuitAction,
  UpdateDistanceSetFieldAction,
} from './workout';
import {
  ClearUserInfoAction,
  LoadUserInfoAction,
  LoadUsersWorkoutsAction,
  SetupNewUserAction,
  ToggleUserProfileDialogAction,
  ValidatedUserAction,
} from './user-info';
import {
  LoadCircuitTypesAction,
  LoadExerciseTypesAction,
} from './workout-configurations';
import {
  CloseSideDrawerAction,
  OpenSideDrawerAction,
  SetDrawerSizeAction,
  UserClickedCloseDrawerAction,
  UserClickedOpenDrawerAction,
} from './side-drawer';
import {
  ResetStopwatchAction,
  StartStopwatchAction,
  StopStopwatchAction,
  UpdateStopwatchAction,
} from './stopwatch';
import {
  ApplyHoverStylesToMuscleGroupAction,
  ClearHoverStylesForMuscleGroupAction,
  ToggleMuscleGroupAction,
} from './muscle-selector';
import { LoadCircuitTemplatesAction } from './circuit-template';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  CLEAR_USER_INFO = 'CLEAR_USER_INFO',

  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',
  LOAD_CIRCUIT_TYPES = 'LOAD_CIRCUIT_TYPES',

  LOAD_CIRCUIT_TEMPLATES = 'LOAD_CIRCUIT_TEMPLATES',
  UPDATE_WORKOUT_DATE = 'UPDATE_WORKOUT_DATE',
  ADD_CIRCUIT = 'ADD_CIRCUIT',
  DELETE_CIRCUIT = 'DELETE_CIRCUIT',
  ADD_EXERCISE_TO_CIRCUIT = 'ADD_EXERCISE_TO_CIRCUIT',
  DELETE_EXERCISE_FROM_CIRCUIT = 'DELETE_EXERCISE_FROM_CIRCUIT',
  ADD_EXERCISE_SET_TO_CIRCUIT = 'ADD_EXERCISE_SET_TO_CIRCUIT',
  DELETE_EXERCISE_SET_FROM_CIRCUIT = 'DELETE_EXERCISE_SET_FROM_CIRCUIT',
  TOGGLE_EXERCISE_SET_DONE = 'TOGGLE_EXERCISE_SET_DONE',
  UPDATE_WORKOUT_SET_FIELD = 'UPDATE_WORKOUT_SET_FIELD',
  UPDATE_TIME_SET_FIELD = 'UPDATE_TIME_SET_FIELD',
  UPDATE_DISTANCE_SET_FIELD = 'UPDATE_DISTANCE_SET_FIELD',
  TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
  CLEAR_WORKOUT_SCREEN = 'CLEAR_WORKOUT_SCREEN',
  TOGGLE_USER_PROFILE_DIALOG = 'TOGGLE_USER_PROFILE_DIALOG',
  LOAD_USER_INFO = 'LOAD_USER_INFO',
  VALIDATED_USER = 'VALIDATED_USER',
  SETUP_NEW_USER = 'SETUP_NEW_USER',
  LOAD_USER_WORKOUTS = 'LOAD_USER_WORKOUTS',
  TOGGLE_MUSCLE_GROUP = 'TOGGLE_MUSCLE_GROUP',
  APPLY_HOVER_STYLES_TO_MUSCLE_GROUP = 'APPLY_HOVER_STYLES_TO_MUSCLE_GROUP',
  CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP = 'CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP',

  // Stopwatch
  RESET_STOPWATCH = 'RESET_STOPWATCH',
  START_STOPWATCH = 'START_STOPWATCH',
  STOP_STOPWATCH = 'STOP_STOPWATCH',
  UPDATE_STOPWATCH = 'UPDATE_STOPWATCH',

  // Side drawer actions
  CLOSE_SIDE_DRAWER = 'CLOSE_SIDE_DRAWER',
  OPEN_SIDE_DRAWER = 'OPEN_SIDE_DRAWER',
  SET_DRAWER_SIZE = 'SET_DRAWER_SIZE',
  USER_CLICKED_CLOSE_DRAWER = 'USER_CLICKED_CLOSE_DRAWER',
  USER_CLICKED_OPEN_DRAWER = 'USER_CLICKED_OPEN_DRAWER',
}

export type ApplicationActions =
  | LocationChangeAction
  | LoadExerciseTypesAction
  | LoadCircuitTypesAction
  | UpdateWorkoutDateAction
  | AddCircuitAction
  | DeleteCircuitAction
  | AddExerciseToCircuitAction
  | DeleteExerciseFromCircuitAction
  | AddExerciseSetToCircuitAction
  | DeleteExerciseSetFromCircuitAction
  | ToggleExerciseSetAsDoneAction
  | ToggleAccordionAction
  | ClearWorkoutScreenAction
  | UpdateTimeSetFieldAction
  | UpdateDistanceSetFieldAction
  | ClearUserInfoAction
  | UpdateWorkoutSetFieldAction
  | CloseSideDrawerAction
  | OpenSideDrawerAction
  | SetDrawerSizeAction
  | UserClickedCloseDrawerAction
  | UserClickedOpenDrawerAction
  | ToggleUserProfileDialogAction
  | LoadUserInfoAction
  | ValidatedUserAction
  | SetupNewUserAction
  | LoadUsersWorkoutsAction
  | StopStopwatchAction
  | StartStopwatchAction
  | ResetStopwatchAction
  | UpdateStopwatchAction
  | ToggleMuscleGroupAction
  | ApplyHoverStylesToMuscleGroupAction
  | ClearHoverStylesForMuscleGroupAction
  | LoadCircuitTemplatesAction;
