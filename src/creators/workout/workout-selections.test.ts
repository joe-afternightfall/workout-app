import {
  checkIfPhaseSelectionRequired,
  closeAndUpdatePhaseIdToAddNewSegment,
  closeEditSet,
  copyRoutineForEdit,
  openEditPreviewOptions,
  openEditSet,
  selectedRoutine,
  selectedWorkoutCategory,
  startWorkout,
  toggleEditOptionButtons,
  toggleExerciseWidgetOnRoutinePreviewPage,
} from './workout-selections';
import { WorkoutActionTypes } from '../actions-workout';
import {
  buildMockRoutineTemplateVO,
  buildMockWorkoutCategoryVO,
} from '../../configs/test-utils/test-vo-builder';
import { chance } from 'jest-chance';

describe('workout selection creator', () => {
  it('should return action', () => {
    const workoutCategoryVO = buildMockWorkoutCategoryVO();

    const response = selectedWorkoutCategory(workoutCategoryVO);

    expect(response).toEqual({
      type: WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY,
      category: workoutCategoryVO,
    });
  });

  it('should return selected routine action', () => {
    const routineTemplateVO = buildMockRoutineTemplateVO(1, 3);

    const response = selectedRoutine(routineTemplateVO);

    expect(response).toEqual({
      type: WorkoutActionTypes.SELECTED_ROUTINE,
      routine: routineTemplateVO,
    });
  });

  it('should return start workout action', () => {
    const response = startWorkout();

    expect(response).toEqual({
      type: WorkoutActionTypes.START_WORKOUT,
    });
  });

  it('should return open edit preview options action', () => {
    const response = openEditPreviewOptions();

    expect(response).toEqual({
      type: WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS,
    });
  });

  it('should return toggle edit option buttons action', () => {
    const props = {
      open: chance.bool(),
      onlyDisplayDelete: chance.bool(),
    };
    const response = toggleEditOptionButtons(props);

    expect(response).toEqual({
      type: WorkoutActionTypes.TOGGLE_EDIT_OPTION_BUTTONS,
      props: props,
    });
  });

  it('should return open edit set action', () => {
    const segmentId = chance.string();

    const response = openEditSet(segmentId);

    expect(response).toEqual({
      type: WorkoutActionTypes.OPEN_EDIT_SET,
      segmentId: segmentId,
    });
  });

  it('should return closeEditSet action', () => {
    const response = closeEditSet();

    expect(response).toEqual({
      type: WorkoutActionTypes.CLOSE_EDIT_SET,
    });
  });

  it('should return copyRoutineForEdit action', () => {
    const response = copyRoutineForEdit();

    expect(response).toEqual({
      type: WorkoutActionTypes.COPY_ROUTINE_FOR_EDIT,
    });
  });

  it('should return toggleExerciseWidgetOnRoutinePreviewPage action', () => {
    const open = chance.bool();
    const response = toggleExerciseWidgetOnRoutinePreviewPage(open);

    expect(response).toEqual({
      type: WorkoutActionTypes.TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE,
      open: open,
    });
  });

  it('should return check if phase selection required action', () => {
    const phaseType = 'editing';
    const response = checkIfPhaseSelectionRequired(phaseType);

    expect(response).toEqual({
      type: WorkoutActionTypes.CHECK_IF_PHASE_SELECTION_REQUIRED,
      phaseType: phaseType,
    });
  });

  it('should return close and update phase id to add new segment action', () => {
    const phaseId = chance.string();
    const response = closeAndUpdatePhaseIdToAddNewSegment(phaseId);

    expect(response).toEqual({
      type: WorkoutActionTypes.CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT,
      phaseId: phaseId,
    });
  });
});
