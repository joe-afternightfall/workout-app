import { exercises, routineTemplates } from '../configs/constants/dummy-data';
import {
  GripType,
  GripWidth,
  ParameterType,
  TrainingSetType,
  PhaseVO,
  ExerciseVO,
  EquipmentVO,
  RoutineTemplateVO,
  WorkoutCategoryVO,
  gripTypes,
  gripWidths,
  parameterTypes,
  trainingSetTypes,
  phases,
  workoutCategories,
  equipmentList,
  sortEntireRoutine,
} from 'workout-app-common-core';
import { WorkoutActionTypes } from './actions-workout';

export interface InitializeWorkoutConfigsAction {
  type: WorkoutActionTypes.INITIALIZE;
  configs: {
    trainingSetTypes: TrainingSetType[];
    phases: PhaseVO[];
    workoutCategories: WorkoutCategoryVO[];
    equipmentList: EquipmentVO[];
    gripWidths: GripWidth[];
    gripTypes: GripType[];
    parameterTypes: ParameterType[];
    exercises: ExerciseVO[];
    routineTemplates: RoutineTemplateVO[];
  };
}

export const initializeWorkoutConfigs = (): InitializeWorkoutConfigsAction => {
  const routineTemplatesCopy = routineTemplates;
  routineTemplatesCopy.map((template) => {
    template.phases = sortEntireRoutine(template.phases);
  });

  return {
    type: WorkoutActionTypes.INITIALIZE,
    configs: {
      trainingSetTypes: trainingSetTypes,
      phases: phases,
      workoutCategories: workoutCategories,
      equipmentList: equipmentList,
      gripWidths: gripWidths,
      gripTypes: gripTypes,
      parameterTypes: parameterTypes,
      exercises: exercises,
      routineTemplates: routineTemplatesCopy,
    },
  };
};
