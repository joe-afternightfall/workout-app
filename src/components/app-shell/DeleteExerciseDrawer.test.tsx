import React from 'react';
import { chance } from 'jest-chance';
import {
  getWorkoutStore,
  renderWithRedux,
} from '../../configs/test-utils/mock-redux';
import { State } from '../../configs/redux/store';
import DeleteExerciseDrawer from './DeleteExerciseDrawer';
import { WorkoutActionTypes } from '../../creators/actions-workout';

describe('Delete Exercise Drawer', () => {
  it('should call close handler when clicked', () => {
    const store = getWorkoutStore({
      deleteExerciseDrawerProps: {
        open: true,
        segmentId: chance.string(),
        phaseType: '',
      },
    } as unknown as State);
    const deleteExerciseDrawer = renderWithRedux(
      <DeleteExerciseDrawer />,
      store
    );
    deleteExerciseDrawer.getByTestId('delete-exercise-cancel-button').click();
    expect(store.getActions()).toEqual([
      {
        props: { open: false, phaseType: '', segmentId: '' },
        type: WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER,
      },
    ]);
  });

  it('should call delete handler', () => {
    const segmentId = chance.string();

    const store = getWorkoutStore({
      deleteExerciseDrawerProps: {
        open: true,
        segmentId: segmentId,
        phaseType: 'activeWorkout',
      },
    } as unknown as State);
    const deleteExerciseDrawer = renderWithRedux(
      <DeleteExerciseDrawer />,
      store
    );
    deleteExerciseDrawer.getByTestId('delete-exercise-button').click();
    expect(deleteExerciseDrawer.getByText('Remove Exercise')).toBeDefined();
    expect(store.getActions()).toEqual([
      {
        segmentId: segmentId,
        type: WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE,
      },
      {
        props: {
          open: false,
          phaseType: '',
          segmentId: '',
        },
        type: WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER,
      },
    ]);
  });
});
