import { WorkoutActionTypes } from '../actions-workout';
import { WorkoutCategoryVO } from '../../configs/models/configurations/WorkoutCategoryVO';
import { RoutineTemplateVO } from '../../configs/models/workout/RoutineTemplateVO';

export interface SelectedWorkoutCategoryAction {
  type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY;
  category: WorkoutCategoryVO;
}

export const selectedWorkoutCategory = (
  category: WorkoutCategoryVO
): SelectedWorkoutCategoryAction => {
  return {
    type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY,
    category: category,
  };
};

export interface SelectedRoutineAction {
  type: WorkoutActionTypes.SELECTED_ROUTINE;
  routine: RoutineTemplateVO;
}
export const selectedRoutine = (
  routine: RoutineTemplateVO
): SelectedRoutineAction => {
  return {
    type: WorkoutActionTypes.SELECTED_ROUTINE,
    routine: routine,
  };
};
