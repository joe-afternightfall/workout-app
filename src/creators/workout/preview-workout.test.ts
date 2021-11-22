import {
  addExerciseToNewStraightSet,
  addExerciseToNewSuperSet,
  addSetToRoutineCopy,
  deleteSetFromRoutineCopy,
  saveEditedVersionOfRoutine,
} from './preview-workout';
import { chance } from 'jest-chance';
import { WorkoutActionTypes } from '../actions-workout';

describe('preview workout creator', () => {
  it('should return delete set from routine copy action', () => {
    const id = chance.string();
    const response = deleteSetFromRoutineCopy(id);

    expect(response).toEqual({
      type: WorkoutActionTypes.DELETE_SET_FROM_ROUTINE_COPY,
      setId: id,
    });
  });

  it('should return addSetToRoutineCopy action', () => {
    const segmentExerciseId = chance.string();
    const response = addSetToRoutineCopy(segmentExerciseId);

    expect(response).toEqual({
      type: WorkoutActionTypes.ADD_SET_TO_ROUTINE_COPY,
      segmentExerciseId: segmentExerciseId,
    });
  });

  it('should return save edited version of routine action', () => {
    const response = saveEditedVersionOfRoutine();

    expect(response).toEqual({
      type: WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE,
    });
  });

  it('should return add exercise to new super set action', () => {
    const exerciseId = chance.string();
    const callbackHandler = () => alert();
    const response = addExerciseToNewSuperSet(exerciseId, callbackHandler);

    expect(response).toEqual({
      type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_SUPER_SET,
      exerciseId: exerciseId,
      callbackHandler: callbackHandler,
    });
  });

  it('should return add exercise to new straight set action', () => {
    const exerciseId = chance.string();
    const response = addExerciseToNewStraightSet(exerciseId);

    expect(response).toEqual({
      type: WorkoutActionTypes.ADD_EXERCISE_TO_NEW_STRAIGHT_SET,
      exerciseId: exerciseId,
    });
  });
});
