import { ActionTypes } from './actions';

export interface ToggleMuscleGroupAction {
  type: ActionTypes.TOGGLE_MUSCLE_GROUP;
  muscleGroupId: string;
}

export const toggleMuscleGroup = (
  muscleGroupId: string
): ToggleMuscleGroupAction => {
  return {
    type: ActionTypes.TOGGLE_MUSCLE_GROUP,
    muscleGroupId: muscleGroupId,
  };
};
