import { WorkoutActionTypes } from './actions-workout';
import {
  equipmentList,
  exercises,
  gripTypes,
  gripWidths,
  parameterTypes,
  phases,
  routineTemplates,
  trainingSetTypes,
  workoutCategories,
} from '../configs/constants/dummy-data';
import { TrainingSetTypeVO } from '../configs/models/configurations/TrainingSetTypeVO';
import { PhaseVO } from '../configs/models/configurations/PhaseVO';
import { WorkoutCategoryVO } from '../configs/models/configurations/WorkoutCategoryVO';
import { EquipmentVO } from '../configs/models/configurations/EquipmentVO';
import { GripWidthVO } from '../configs/models/configurations/GripWidthVO';
import { GripTypeVO } from '../configs/models/configurations/GripTypeVO';
import { ParameterTypeVO } from '../configs/models/configurations/ParameterTypeVO';
import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';
import { RoutineTemplateVO } from '../configs/models/workout/RoutineTemplateVO';

export interface InitializeWorkoutConfigsAction {
  type: WorkoutActionTypes.INITIALIZE;
  configs: {
    trainingSetTypes: TrainingSetTypeVO[];
    phases: PhaseVO[];
    workoutCategories: WorkoutCategoryVO[];
    equipmentList: EquipmentVO[];
    gripWidths: GripWidthVO[];
    gripTypes: GripTypeVO[];
    parameterTypes: ParameterTypeVO[];
    exercises: ExerciseVO[];
    routineTemplates: RoutineTemplateVO[];
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
      exercises: exercises,
      routineTemplates: routineTemplates,
    },
  };
};
