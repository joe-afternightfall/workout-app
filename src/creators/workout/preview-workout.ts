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

export interface SaveEditedVersionOfRoutineAction {
  type: WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE;
}

export const saveEditedVersionOfRoutine =
  (): SaveEditedVersionOfRoutineAction => {
    return {
      type: WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE,
    };
  };

export interface AddExerciseToNewSuperSetAction {
  type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_SUPER_SET;
  exerciseId: string;
  callbackHandler: () => void;
}

export const addExerciseToNewSuperSet = (
  exerciseId: string,
  callbackHandler: () => void
): AddExerciseToNewSuperSetAction => {
  return {
    type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_SUPER_SET,
    exerciseId: exerciseId,
    callbackHandler: callbackHandler,
  };
};

export interface AddExerciseToNewStraightSetAction {
  type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_STRAIGHT_SET;
  exerciseId: string;
}

export const addExerciseToNewStraightSet = (
  exerciseId: string
): AddExerciseToNewStraightSetAction => {
  return {
    type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_STRAIGHT_SET,
    exerciseId: exerciseId,
  };
};
