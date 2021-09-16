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

export interface AddSetToEditingCopyAction {
  type: WorkoutActionTypes.ADD_SET_TO_EDITING_COPY;
  segmentExerciseId: string;
}

export const addSetToEditingCopy = (
  segmentExerciseId: string
): AddSetToEditingCopyAction => {
  return {
    type: WorkoutActionTypes.ADD_SET_TO_EDITING_COPY,
    segmentExerciseId: segmentExerciseId,
  };
};
