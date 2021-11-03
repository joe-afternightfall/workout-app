import {
  ExerciseVO,
  GripTypeVO,
  GripWidthVO,
  ManikinMuscleGroupVO,
  MuscleTargetTypeVO,
  MuscleVO,
  ParameterTypeVO,
  PhaseVO,
  RoutineTemplateVO,
  TrainingSetTypeVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
  sortEntireRoutine,
} from 'workout-app-common-core';

import { WorkoutActionTypes } from '../actions-workout';

export interface LoadExercisesAction {
  type: WorkoutActionTypes.LOAD_EXERCISES;
  exercises: ExerciseVO[];
}

export const loadExercises = (exercises: ExerciseVO[]): LoadExercisesAction => {
  return {
    type: WorkoutActionTypes.LOAD_EXERCISES,
    exercises: exercises,
  };
};

export interface LoadRoutineTemplatesAction {
  type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES;
  templates: RoutineTemplateVO[];
}

export const loadRoutineTemplates = (
  templates: RoutineTemplateVO[]
): LoadRoutineTemplatesAction => {
  templates.map((template) => {
    template.phases = sortEntireRoutine(template.phases);
  });
  return {
    type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES,
    templates: templates,
  };
};

export interface LoadGripTypesAction {
  type: WorkoutActionTypes.LOAD_GRIP_TYPES;
  gripTypes: GripTypeVO[];
}

export const loadGripTypes = (gripTypes: GripTypeVO[]): LoadGripTypesAction => {
  return {
    type: WorkoutActionTypes.LOAD_GRIP_TYPES,
    gripTypes: gripTypes,
  };
};

export interface LoadGripWidthsAction {
  type: WorkoutActionTypes.LOAD_GRIP_WIDTHS;
  gripWidths: GripWidthVO[];
}

export const loadGripWidths = (
  gripWidths: GripWidthVO[]
): LoadGripWidthsAction => {
  return {
    type: WorkoutActionTypes.LOAD_GRIP_WIDTHS,
    gripWidths: gripWidths,
  };
};

export interface LoadManikinMuscleGroupsAction {
  type: WorkoutActionTypes.LOAD_MANIKIN_MUSCLE_GROUP;
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

export const loadManikinMuscleGroups = (
  manikinMuscleGroups: ManikinMuscleGroupVO[]
): LoadManikinMuscleGroupsAction => {
  return {
    type: WorkoutActionTypes.LOAD_MANIKIN_MUSCLE_GROUP,
    manikinMuscleGroups: manikinMuscleGroups,
  };
};

export interface LoadMusclesAction {
  type: WorkoutActionTypes.LOAD_MUSCLES;
  muscles: MuscleVO[];
}

export const loadMuscles = (muscles: MuscleVO[]): LoadMusclesAction => {
  return {
    type: WorkoutActionTypes.LOAD_MUSCLES,
    muscles: muscles,
  };
};

export interface LoadMuscleTargetTypesAction {
  type: WorkoutActionTypes.LOAD_MUSCLE_TARGET_TYPES;
  muscleTargetTypes: MuscleTargetTypeVO[];
}

export const loadMuscleTargetTypes = (
  muscleTargetTypes: MuscleTargetTypeVO[]
): LoadMuscleTargetTypesAction => {
  return {
    type: WorkoutActionTypes.LOAD_MUSCLE_TARGET_TYPES,
    muscleTargetTypes: muscleTargetTypes,
  };
};

export interface LoadParameterTypesAction {
  type: WorkoutActionTypes.LOAD_PARAMETER_TYPES;
  parameterTypes: ParameterTypeVO[];
}

export const loadParameterTypes = (
  parameterTypes: ParameterTypeVO[]
): LoadParameterTypesAction => {
  return {
    type: WorkoutActionTypes.LOAD_PARAMETER_TYPES,
    parameterTypes: parameterTypes,
  };
};

export interface LoadPhasesAction {
  type: WorkoutActionTypes.LOAD_PHASES;
  phases: PhaseVO[];
}

export const loadPhases = (phases: PhaseVO[]): LoadPhasesAction => {
  return {
    type: WorkoutActionTypes.LOAD_PHASES,
    phases: phases,
  };
};

export interface LoadTrainingSetTypesAction {
  type: WorkoutActionTypes.LOAD_TRAINING_SET_TYPES;
  trainingSetTypes: TrainingSetTypeVO[];
}

export const loadTrainingSetTypes = (
  trainingSetTypes: TrainingSetTypeVO[]
): LoadTrainingSetTypesAction => {
  return {
    type: WorkoutActionTypes.LOAD_TRAINING_SET_TYPES,
    trainingSetTypes: trainingSetTypes,
  };
};

export interface LoadWorkoutCategoriesAction {
  type: WorkoutActionTypes.LOAD_WORKOUT_CATEGORIES;
  workoutCategories: WorkoutCategoryVO[];
}

export const loadWorkoutCategories = (
  workoutCategories: WorkoutCategoryVO[]
): LoadWorkoutCategoriesAction => {
  return {
    type: WorkoutActionTypes.LOAD_WORKOUT_CATEGORIES,
    workoutCategories: workoutCategories,
  };
};

export interface LoadWorkoutEquipmentAction {
  type: WorkoutActionTypes.LOAD_WORKOUT_EQUIPMENT;
  workoutEquipment: WorkoutEquipmentVO[];
}

export const loadWorkoutEquipment = (
  workoutEquipment: WorkoutEquipmentVO[]
): LoadWorkoutEquipmentAction => {
  return {
    type: WorkoutActionTypes.LOAD_WORKOUT_EQUIPMENT,
    workoutEquipment: workoutEquipment,
  };
};
