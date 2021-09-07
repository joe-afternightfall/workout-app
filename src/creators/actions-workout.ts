import { LocationChangeAction } from 'connected-react-router';
import { InitializeWorkoutConfigsAction } from './initialize';
import {
  SelectedRoutineAction,
  SelectedWorkoutCategoryAction,
  StartWorkoutAction,
} from './new-workout/workout-selections';
import { MarkCurrentSetAsDoneAction } from './new-workout/active-workout';

export enum WorkoutActionTypes {
  // Workout Actions
  INITIALIZE = 'INITIALIZE',
  SELECTED_WORKOUT_CATEGORY = 'SELECTED_WORKOUT_CATEGORY',
  SELECTED_ROUTINE = 'SELECTED_ROUTINE',
  START_WORKOUT = 'START_WORKOUT',
  MARK_CURRENT_SET_AS_DONE = 'MARK_CURRENT_SET_AS_DONE',
}

export type WorkoutActions =
  | LocationChangeAction
  | InitializeWorkoutConfigsAction
  | SelectedWorkoutCategoryAction
  | SelectedRoutineAction
  | StartWorkoutAction
  | MarkCurrentSetAsDoneAction;
