import { LoadExercisesAction } from './exercise';
import { LocationChangeAction } from 'connected-react-router';
import { LoadWorkoutCategoriesAction } from './workout-categories';
import {
  AddCircuitAction,
  AddExerciseSetToCircuitAction,
  AddExerciseToCircuitAction,
  DeleteCircuitAction,
  DeleteExerciseFromCircuitAction,
  DeleteExerciseSetFromCircuitAction,
  ToggleAccordionAction,
  ToggleExerciseSetAsDoneAction,
  UpdateWorkoutDateAction,
  UpdateWorkoutSetFieldAction,
} from './workout';
import { UpdateLoggedInUserAction } from './user-info';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_WORKOUT_CATEGORIES = 'LOAD_WORKOUT_CATEGORIES',
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
}

export type ApplicationActions =
  | LocationChangeAction
  | LoadExercisesAction
  | LoadWorkoutCategoriesAction
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
  | ToggleAccordionAction;
