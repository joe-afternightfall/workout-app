import { ActionTypes } from './actions';
import { MuscleGroupVO } from '../configs/models/MuscleGroupVO';

export interface LoadMuscleGroupsAction {
  type: ActionTypes.LOAD_MUSCLE_GROUPS;
  muscleGroups: MuscleGroupVO[];
}

export const loadMuscleGroups = (
  groups: MuscleGroupVO[]
): LoadMuscleGroupsAction => {
  return {
    type: ActionTypes.LOAD_MUSCLE_GROUPS,
    muscleGroups: groups,
  };
};
