import { WorkoutActionTypes } from '../actions-workout';

export interface DeleteSetFromEditingCopyAction {
  type: WorkoutActionTypes.DELETE_SET_FROM_EDITING_COPY;
  setId: string;
}

export const deleteSetFromEditingCopy = (
  setId: string
): DeleteSetFromEditingCopyAction => {
  return {
    type: WorkoutActionTypes.DELETE_SET_FROM_EDITING_COPY,
    setId: setId,
  };
};
