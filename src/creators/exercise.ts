import { ActionTypes } from './actions';
import { ExerciseVO } from '../configs/models/ExerciseVO';

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
