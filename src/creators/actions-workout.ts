import { LocationChangeAction } from 'connected-react-router';
import { InitializeWorkoutConfigsAction } from './initialize';
import {
  SelectedRoutineAction,
  SelectedWorkoutCategoryAction,
} from './new-workout/workout-selections';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
  SELECTED_WORKOUT_CATEGORY = 'SELECTED_WORKOUT_CATEGORY',
  SELECTED_ROUTINE = 'SELECTED_ROUTINE',
}

export type WorkoutActions =
  | LocationChangeAction
  | InitializeWorkoutConfigsAction
  | SelectedWorkoutCategoryAction
  | SelectedRoutineAction;
