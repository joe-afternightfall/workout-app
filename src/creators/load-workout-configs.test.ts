import {
  loadExerciseImages,
  loadExercises,
  loadGripTypes,
  loadGripWidths,
  loadManikinMuscleGroups,
  loadMuscles,
  loadMuscleTargetTypes,
  loadParameterTypes,
  loadPhases,
  loadRoutineTemplates,
  loadTrainingSetTypes,
  loadWorkoutCategories,
  loadWorkoutEquipment,
} from './load-workout-configs';
import {
  buildMockExercise,
  buildMockRoutineTemplateVO,
} from '../configs/test-utils/test-vo-builder';
import { ActionTypes } from './actions';
import { chance } from 'jest-chance';

describe('load workout config creator', () => {
  it('should return load exercises action', () => {
    const exerciseVO = buildMockExercise();
    const response = loadExercises([exerciseVO]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_EXERCISES,
      exercises: [exerciseVO],
    });
  });

  it('should return loadRoutineTemplates action', () => {
    const routineTemplateVO = buildMockRoutineTemplateVO(3, 2);
    const response = loadRoutineTemplates([routineTemplateVO]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_ROUTINE_TEMPLATES,
      templates: [routineTemplateVO],
    });
  });

  it('should return loadGripTypes action', () => {
    const response = loadGripTypes([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_GRIP_TYPES,
      gripTypes: [],
    });
  });

  it('should return loadGripWidths actino', () => {
    const response = loadGripWidths([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_GRIP_WIDTHS,
      gripWidths: [],
    });
  });

  it('should return loadManikinMuscleGroups action', () => {
    const response = loadManikinMuscleGroups([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_MANIKIN_MUSCLE_GROUP,
      manikinMuscleGroups: [],
    });
  });

  it('should return loadMuscles action', () => {
    const response = loadMuscles([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_MUSCLES,
      muscles: [],
    });
  });

  it('should return loadMuscleTargetTypes action', () => {
    const response = loadMuscleTargetTypes([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_MUSCLE_TARGET_TYPES,
      muscleTargetTypes: [],
    });
  });

  it('should return loadParameterTypes action', () => {
    const response = loadParameterTypes([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_PARAMETER_TYPES,
      parameterTypes: [],
    });
  });

  it('should return load phases action', () => {
    const response = loadPhases([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_PHASES,
      phases: [],
    });
  });
  it('should return load training set types action', () => {
    const response = loadTrainingSetTypes([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_TRAINING_SET_TYPES,
      trainingSetTypes: [],
    });
  });

  it('should return load workout categories action', () => {
    const response = loadWorkoutCategories([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_WORKOUT_CATEGORIES,
      workoutCategories: [],
    });
  });

  it('should return load workout equipment action', () => {
    const response = loadWorkoutEquipment([]);

    expect(response).toEqual({
      type: ActionTypes.LOAD_WORKOUT_EQUIPMENT,
      workoutEquipment: [],
    });
  });

  it('should return load exercise images action', () => {
    const folderName = chance.string();
    const downloadUrls = [chance.string()];
    const response = loadExerciseImages(folderName, downloadUrls);

    expect(response).toEqual({
      type: ActionTypes.LOAD_EXERCISE_IMAGES,
      images: {
        name: folderName,
        downloadUrls: downloadUrls,
      },
    });
  });
});
