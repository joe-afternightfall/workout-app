import { chance } from 'jest-chance';
import {
  buildRoutineTemplateVO,
  buildWorkoutCategoryVO,
} from '../configs/test-utils/test-vo-builder';
import workout, { WorkoutState } from './workout';
import { WorkoutActionTypes } from '../creators/actions-workout';

jest.mock('array-move', () => ({
  arrayMoveImmutable: jest.fn(),
}));

describe('workout reducer', function () {
  it('should return SELECTED_WORKOUT_CATEGORY action', function () {
    const workoutCategoryVO = buildWorkoutCategoryVO();

    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY,
      category: workoutCategoryVO,
    });

    expect(state.selectedWorkoutCategory).toEqual(workoutCategoryVO);
  });

  it('should return SELECTED_ROUTINE action', function () {
    const routineTemplateVO = buildRoutineTemplateVO();
    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.SELECTED_ROUTINE,
      routine: routineTemplateVO,
    });

    expect(state.selectedRoutineTemplate).toEqual(routineTemplateVO);
  });

  it('should return TOGGLE_EDIT_OPTION_BUTTONS action', function () {
    const editOptionProps = {
      open: chance.bool(),
      onlyDisplayDelete: chance.bool(),
    };
    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.TOGGLE_EDIT_OPTION_BUTTONS,
      props: editOptionProps,
    });

    expect(state.editOptions).toEqual(editOptionProps);
  });

  it('should return OPEN_EDIT_PREVIEW_OPTIONS action', function () {
    const routineTemplateVO = buildRoutineTemplateVO();
    const state = workout.reducer(
      {
        editOptions: { open: false, onlyDisplayDelete: false },
        selectedRoutineTemplate: routineTemplateVO,
      } as unknown as WorkoutState,
      {
        type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS,
      }
    );

    expect(state.editOptions.open).toEqual(true);
    expect(state.copyOfRoutineTemplate).toEqual(routineTemplateVO);
  });
});
