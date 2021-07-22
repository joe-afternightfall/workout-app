import { Exercise } from '../configs/app-types';
import { ActionTypes } from './actions';
import { ExerciseVO } from '../configs/models/ExerciseVO';

export interface UpdateWarmUpsAction {
  type: ActionTypes.UPDATE_WARM_UPS;
  exercise: Exercise;
}

export const updateWarmUps = (props: Exercise): UpdateWarmUpsAction => {
  return {
    type: ActionTypes.UPDATE_WARM_UPS,
    exercise: props,
  };
};

export interface LoadExercisesAction {
  type: ActionTypes.LOAD_EXERCISES;
  exercises: ExerciseVO[];
}

export const loadExercises = (exercises: ExerciseVO[]): LoadExercisesAction => {
  return {
    type: ActionTypes.LOAD_EXERCISES,
    exercises: exercises,
  };
};
