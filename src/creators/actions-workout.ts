import { LocationChangeAction } from 'connected-react-router';
import { InitializeWorkoutConfigsAction } from './initialize';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
}

export type WorkoutActions =
  | InitializeWorkoutConfigsAction
  | LocationChangeAction;
