import {
  GripType,
  GripWidth,
  ParameterType,
  TrainingSetType,
  PhaseVO,
  EquipmentVO,
  WorkoutCategoryVO,
  gripTypes,
  gripWidths,
  parameterTypes,
  trainingSetTypes,
  phases,
  workoutCategories,
  equipmentList,
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
  };
}

export const initializeWorkoutConfigs = (): InitializeWorkoutConfigsAction => {
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
    },
  };
};
