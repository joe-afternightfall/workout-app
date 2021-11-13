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

// jest.mock('../utils/edit-object-util', () => {
//   // const originalModule = jest.requireActual('../foo-bar-baz');
//
//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     // ...originalModule,
//     deleteSegmentFromPhase: jest.fn(() => mockPhases),
//   };
// });

describe('workout reducer', () => {
  it('should return SELECTED_WORKOUT_CATEGORY action', () => {
    const workoutCategoryVO = buildWorkoutCategoryVO();

    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY,
      category: workoutCategoryVO,
    });

    expect(state.selectedWorkoutCategory).toEqual(workoutCategoryVO);
  });

  it('should return SELECTED_ROUTINE action', () => {
    const routineTemplateVO = buildRoutineTemplateVO(2, 4);
    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.SELECTED_ROUTINE,
      routine: routineTemplateVO,
    });

    expect(state.selectedRoutineTemplate).toEqual(routineTemplateVO);
  });

  it('should return TOGGLE_EDIT_OPTION_BUTTONS action', () => {
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

  it('should return OPEN_EDIT_PREVIEW_OPTIONS action', () => {
    const routineTemplateVO = buildRoutineTemplateVO(2, 4);
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

  it('should return OPEN_EDIT_SET action', () => {
    const segmentId = chance.string();
    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.OPEN_EDIT_SET,
      segmentId: segmentId,
    });

    expect(state.displayEditSet).toEqual(true);
    expect(state.editSetSegmentId).toEqual(segmentId);
  });

  it('should return CLOSE_EDIT_SET action', () => {
    const state = workout.reducer({} as unknown as WorkoutState, {
      type: WorkoutActionTypes.CLOSE_EDIT_SET,
    });

    expect(state.displayEditSet).toEqual(false);
    expect(state.editSetSegmentId).toEqual('');
  });

  it('should return DELETE_SELECTED_SEGMENT_FROM_ROUTINE action with copyOfRoutineTemplate', () => {
    const segmentId = chance.string();
    const copyOfRoutineTemplate = buildRoutineTemplateVO(3, 4);
    const state = workout.reducer(
      {
        deleteExerciseDrawerProps: {
          open: false,
          phaseType: 'editing',
          segmentId: segmentId,
        },
        copyOfRoutineTemplate: copyOfRoutineTemplate,
      } as unknown as WorkoutState,
      {
        type: WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE,
        segmentId: copyOfRoutineTemplate.phases[0].segments[0].id,
      }
    );

    expect(state.copyOfRoutineTemplate.phases.length).toEqual(3);
    expect(state.copyOfRoutineTemplate.phases[0].segments.length).toEqual(3);
  });
});
