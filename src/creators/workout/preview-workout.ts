import { WorkoutActionTypes } from '../actions-workout';

export interface DeleteSetFromRoutineCopyAction {
  type: WorkoutActionTypes.DELETE_SET_FROM_ROUTINE_COPY;
  setId: string;
}

export const deleteSetFromRoutineCopy = (
  setId: string
): DeleteSetFromRoutineCopyAction => {
  return {
    type: WorkoutActionTypes.DELETE_SET_FROM_ROUTINE_COPY,
    setId: setId,
  };
};

export interface AddSetToRoutineCopyAction {
  type: WorkoutActionTypes.ADD_SET_TO_ROUTINE_COPY;
  segmentExerciseId: string;
}

export const addSetToRoutineCopy = (
  segmentExerciseId: string
): AddSetToRoutineCopyAction => {
  return {
    type: WorkoutActionTypes.ADD_SET_TO_ROUTINE_COPY,
    segmentExerciseId: segmentExerciseId,
  };
};

export interface DeleteSegmentFromRoutineCopyAction {
  type: WorkoutActionTypes.DELETE_SEGMENT_FROM_ROUTINE_COPY;
  segmentId: string;
}
export const deleteSegmentFromRoutineCopy = (
  segmentId: string
): DeleteSegmentFromRoutineCopyAction => {
  return {
    type: WorkoutActionTypes.DELETE_SEGMENT_FROM_ROUTINE_COPY,
    segmentId: segmentId,
  };
};

export interface SaveEditedVersionOfRoutineAction {
  type: WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE;
}

export const saveEditedVersionOfRoutine =
  (): SaveEditedVersionOfRoutineAction => {
    return {
      type: WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE,
    };
  };
