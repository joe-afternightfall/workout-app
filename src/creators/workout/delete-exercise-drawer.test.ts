import {
  toggleDeleteExerciseDrawer,
  deleteSelectedSegmentFromRoutine,
} from './delete-exercise-drawer';
import { chance } from 'jest-chance';
import { WorkoutActionTypes } from '../actions-workout';

describe('delete exercise drawer', () => {
  it('should return delete selected segment from routine action', () => {
    const segmentId = chance.string();
    const response = deleteSelectedSegmentFromRoutine(segmentId);

    expect(response).toEqual({
      type: WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE,
      segmentId: segmentId,
    });
  });

  it('should toggle delete exercise drawer action', () => {
    const open = chance.bool();
    const segmentId = chance.string();
    const response = toggleDeleteExerciseDrawer({
      open: open,
      segmentId: segmentId,
      phaseType: 'editing',
    });

    expect(response).toEqual({
      type: WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER,
      props: {
        open: open,
        segmentId: segmentId,
        phaseType: 'editing',
      },
    });
  });
});
