import { ActionTypes } from './actions';
import { WorkoutCategoryVO } from '../configs/models/WorkoutCategoryVO';

export interface LoadMuscleGroupsAction {
  type: ActionTypes.LOAD_MUSCLE_GROUPS;
  muscleGroups: WorkoutCategoryVO[];
}

export const loadWorkoutCategories = (
  groups: WorkoutCategoryVO[]
): LoadMuscleGroupsAction => {
  return {
    type: ActionTypes.LOAD_MUSCLE_GROUPS,
    muscleGroups: groups,
  };
};
