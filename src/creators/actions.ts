import { LoadExercisesAction, UpdateWarmUpsAction } from './exercise';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  UPDATE_WARM_UPS = 'UPDATE_WARM_UPS',
  LOAD_EXERCISES = 'LOAD_EXERCISES',
}

export type ApplicationActions = UpdateWarmUpsAction | LoadExercisesAction;
