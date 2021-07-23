import { ActionTypes } from './actions';
import { WorkoutCategoryVO } from '../configs/models/WorkoutCategoryVO';

export interface LoadWorkoutCategoriesAction {
  type: ActionTypes.LOAD_WORKOUT_CATEGORIES;
  workoutCategories: WorkoutCategoryVO[];
}

export const loadWorkoutCategories = (
  categories: WorkoutCategoryVO[]
): LoadWorkoutCategoriesAction => {
  return {
    type: ActionTypes.LOAD_WORKOUT_CATEGORIES,
    workoutCategories: categories,
  };
};
