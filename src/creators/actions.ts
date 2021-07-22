import { LoadExercisesAction, UpdateWarmUpsAction } from './exercise';
import { LocationChangeAction } from 'connected-react-router';
import { LoadMuscleGroupsAction } from './muscle-groups';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  UPDATE_WARM_UPS = 'UPDATE_WARM_UPS',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_MUSCLE_GROUPS = 'LOAD_MUSCLE_GROUPS',
}

export type ApplicationActions =
  | LocationChangeAction
  | UpdateWarmUpsAction
  | LoadExercisesAction
  | LoadMuscleGroupsAction;
