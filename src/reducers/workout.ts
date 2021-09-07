import { LOCATION_CHANGE } from 'connected-react-router';
import {
  WorkoutActions,
  WorkoutActionTypes,
} from '../creators/actions-workout';
import { TrainingSetTypeVO } from '../configs/models/configurations/TrainingSetTypeVO';
import { PhaseVO } from '../configs/models/configurations/PhaseVO';
import { WorkoutCategoryVO } from '../configs/models/configurations/WorkoutCategoryVO';
import { EquipmentVO } from '../configs/models/configurations/EquipmentVO';
import { GripWidthVO } from '../configs/models/configurations/GripWidthVO';
import { GripTypeVO } from '../configs/models/configurations/GripTypeVO';
import { ParameterTypeVO } from '../configs/models/configurations/ParameterTypeVO';
import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';
import { RoutineTemplateVO } from '../configs/models/workout/RoutineTemplateVO';

export default {
  reducer: (
    state: WorkoutState = {} as unknown as WorkoutState,
    action: WorkoutActions
  ): WorkoutState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        break;
      case WorkoutActionTypes.INITIALIZE:
        newState.configs = action.configs;
        break;
      case WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY:
        newState.selectedWorkoutCategory = action.category;
        break;
      case WorkoutActionTypes.SELECTED_ROUTINE:
        newState.selectedRoutineTemplate = action.routine;
        break;
      default:
        break;
    }

    return newState;
  },
};

export interface WorkoutState {
  currentLocation: string;
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
  selectedWorkoutCategory: WorkoutCategoryVO;
  selectedRoutineTemplate: RoutineTemplateVO;
}
