import { LoadExercisesAction, UpdateWarmUpsAction } from './exercise';
import { LocationChangeAction } from 'connected-react-router';
import { LoadWorkoutCategoriesAction } from './workout-categories';
import {
  AddCircuitAction,
  DeleteCircuitAction,
  UpdateWorkoutDateAction,
} from './workout';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  UPDATE_WARM_UPS = 'UPDATE_WARM_UPS',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_WORKOUT_CATEGORIES = 'LOAD_WORKOUT_CATEGORIES',
  UPDATE_WORKOUT_DATE = 'UPDATE_WORKOUT_DATE',
  ADD_CIRCUIT = 'ADD_CIRCUIT',
  DELETE_CIRCUIT = 'DELETE_CIRCUIT',
}

export type ApplicationActions =
  | LocationChangeAction
  | UpdateWarmUpsAction
  | LoadExercisesAction
  | LoadWorkoutCategoriesAction
  | UpdateWorkoutDateAction
  | AddCircuitAction
  | DeleteCircuitAction;
