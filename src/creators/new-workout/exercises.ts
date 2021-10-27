import { WorkoutActionTypes } from '../actions-workout';
import { ExerciseVO } from 'workout-app-common-core';

export interface LoadExercisesAction {
  type: WorkoutActionTypes.LOAD_EXERCISES;
  exercises: ExerciseVO[];
}

export const loadExercises = (exercises: ExerciseVO[]): LoadExercisesAction => {
  return {
    type: WorkoutActionTypes.LOAD_EXERCISES,
    exercises: exercises,
  };
};
