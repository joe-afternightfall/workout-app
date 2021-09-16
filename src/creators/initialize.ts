import {
  equipmentList,
  exercises,
  phases,
  routineTemplates,
  workoutCategories,
} from '../configs/constants/dummy-data';
import {
  GripType,
  GripWidth,
  ParameterType,
  TrainingSetType,
} from '../configs/models/AppInterfaces';
import { WorkoutActionTypes } from './actions-workout';
import { gripTypes } from '../configs/app-data/grip-types';
import { gripWidths } from '../configs/app-data/grip-widths';
import { PhaseVO } from '../configs/models/configurations/PhaseVO';
import { parameterTypes } from '../configs/app-data/parameter-types';
import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';
import { trainingSetTypes } from '../configs/app-data/training-set-types';
import { EquipmentVO } from '../configs/models/configurations/EquipmentVO';
import { RoutineTemplateVO } from '../configs/models/workout/RoutineTemplateVO';
import { WorkoutCategoryVO } from '../configs/models/configurations/WorkoutCategoryVO';
import { sortWorkoutByOrder } from '../utils/active-workout';

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
    template.phases = sortWorkoutByOrder(template.phases);
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
