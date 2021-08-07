import { LocationChangeAction } from 'connected-react-router';
import {
  AddCircuitAction,
  DeleteCircuitAction,
  ToggleAccordionAction,
  UpdateWorkoutDateAction,
  ClearWorkoutScreenAction,
  AddExerciseToCircuitAction,
  UpdateWorkoutSetFieldAction,
  ToggleExerciseSetAsDoneAction,
  AddExerciseSetToCircuitAction,
  DeleteExerciseFromCircuitAction,
  DeleteExerciseSetFromCircuitAction,
} from './workout';
import { UpdateLoggedInUserAction } from './user-info';
import {
  LoadCircuitTypesAction,
  LoadCategoryTypesAction,
  LoadExerciseTypesAction,
} from './workout-configurations';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',

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
  TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
  CLEAR_WORKOUT_SCREEN = 'CLEAR_WORKOUT_SCREEN',
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
  | ClearWorkoutScreenAction;
