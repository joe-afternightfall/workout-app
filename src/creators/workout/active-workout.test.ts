import {
  workoutDone,
  clearActiveWorkout,
  markCurrentSetAsDone,
  startSelectedSegment,
} from './active-workout';
import { chance } from 'jest-chance';
import { WorkoutActionTypes } from '../actions-workout';

describe('active workout creator', () => {
  it('should return mark current set as done action', () => {
    const segmentId = chance.string();
    const setNumber = chance.integer();
    const lastSet = chance.bool();
    const lastSegment = chance.bool();
    const response = markCurrentSetAsDone(
      segmentId,
      setNumber,
      lastSet,
      lastSegment
    );

    expect(response).toEqual({
      type: WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE,
      segmentId: segmentId,
      setNumber: setNumber,
      lastSet: lastSet,
      lastSegment: lastSegment,
    });
  });

  it('should return workout done action', () => {
    const response = workoutDone();

    expect(response).toEqual({ type: 'WORKOUT_DONE' });
  });

  it('should return clear active workout action', () => {
    const response = clearActiveWorkout();

    expect(response).toEqual({
      type: WorkoutActionTypes.CLEAR_ACTIVE_WORKOUT,
      workout: {
        id: '',
        date: '',
        startTime: '',
        endTime: '',
        routine: {
          id: '',
          name: '',
          workoutCategoryId: '',
          phases: [],
        },
      },
    });
  });

  it('should return start selected segment action', () => {
    const segmentId = chance.string();

    const response = startSelectedSegment(segmentId);

    expect(response).toEqual({
      type: WorkoutActionTypes.START_SELECTED_SEGMENT,
      segmentId: segmentId,
    });
  });
});
