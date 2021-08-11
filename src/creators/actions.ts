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
import { ClearUserInfoAction, UpdateLoggedInUserAction } from './user-info';
import {
  LoadCircuitTypesAction,
  LoadCategoryTypesAction,
  LoadExerciseTypesAction,
} from './workout-configurations';
import {
  CloseSideDrawerAction,
  OpenSideDrawerAction,
  SetDrawerSizeAction,
  UserClickedCloseDrawerAction,
  UserClickedOpenDrawerAction,
} from './side-drawer';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  CLEAR_USER_INFO = 'CLEAR_USER_INFO',

  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',
  LOAD_CATEGORY_TYPES = 'LOAD_CATEGORY_TYPES',
  LOAD_CIRCUIT_TYPES = 'LOAD_CIRCUIT_TYPES',

  UPDATE_WORKOUT_DATE = 'UPDATE_WORKOUT_DATE',
  ADD_CIRCUIT = 'ADD_CIRCUIT',
  DELETE_CIRCUIT = 'DELETE_CIRCUIT',
  ADD_EXERCISE_TO_CIRCUIT = 'ADD_EXERCISE_TO_CIRCUIT',
  DELETE_EXERCISE_FROM_CIRCUIT = 'DELETE_EXERCISE_FROM_CIRCUIT',
  LOGGED_IN_USER = 'LOGGED_IN_USER',
  ADD_EXERCISE_SET_TO_CIRCUIT = 'ADD_EXERCISE_SET_TO_CIRCUIT',
  DELETE_EXERCISE_SET_FROM_CIRCUIT = 'DELETE_EXERCISE_SET_FROM_CIRCUIT',
  TOGGLE_EXERCISE_SET_DONE = 'TOGGLE_EXERCISE_SET_DONE',
  UPDATE_WORKOUT_SET_FIELD = 'UPDATE_WORKOUT_SET_FIELD',
  UPDATE_TIME_SET_FIELD = 'UPDATE_TIME_SET_FIELD',
  UPDATE_DISTANCE_SET_FIELD = 'UPDATE_DISTANCE_SET_FIELD',
  TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
  CLEAR_WORKOUT_SCREEN = 'CLEAR_WORKOUT_SCREEN',

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
  | LoadCategoryTypesAction
  | LoadCircuitTypesAction
  | UpdateWorkoutDateAction
  | AddCircuitAction
  | DeleteCircuitAction
  | AddExerciseToCircuitAction
  | DeleteExerciseFromCircuitAction
  | UpdateLoggedInUserAction
  | AddExerciseSetToCircuitAction
  | DeleteExerciseSetFromCircuitAction
  | ToggleExerciseSetAsDoneAction
  | UpdateWorkoutSetFieldAction
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
  | UserClickedOpenDrawerAction;
