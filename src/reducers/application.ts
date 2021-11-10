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
  UserProfileVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { ExerciseImage } from '../creators/load-workout-configs';
import { ApplicationRouteProp } from '../configs/constants/app';
import { ActionTypes, ApplicationActions } from '../creators/actions';

export default {
  reducer: function (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE: {
        newState.currentLocation = action.payload.location.pathname;
        const activePage = getPageInfo(newState.currentLocation);
        newState.activePage = activePage;
        if (activePage) {
          newState.selectedNavTestId = activePage.testId;
        }
        break;
      }
      case ActionTypes.VALIDATED_USER:
        newState.userIsValidated = true;
        newState.userEmail = action.email;
        break;
      case ActionTypes.SETUP_NEW_USER:
        newState.setupNewUser = true;
        newState.userEmail = action.email;
        break;
      case ActionTypes.LOAD_USER_INFO:
        newState.userProfile = action.userProfile;
        newState.setupNewUser = false;
        newState.openUserProfileDialog = false;
        break;
      case ActionTypes.TOGGLE_USER_PROFILE_DIALOG:
        newState.openUserProfileDialog = action.shouldOpen;
        break;
      case ActionTypes.CLEAR_USER_INFO:
        newState.userProfile = action.userProfile;
        newState.userIsValidated = false;
        break;
      case ActionTypes.LOAD_EXERCISES:
        newState.workoutConfigurations.exercises = action.exercises;
        break;
      case ActionTypes.LOAD_ROUTINE_TEMPLATES:
        newState.workoutConfigurations.routineTemplates = action.templates;
        break;
      case ActionTypes.LOAD_GRIP_TYPES:
        newState.workoutConfigurations.gripTypes = action.gripTypes;
        break;
      case ActionTypes.LOAD_GRIP_WIDTHS:
        newState.workoutConfigurations.gripWidths = action.gripWidths;
        break;
      case ActionTypes.LOAD_MANIKIN_MUSCLE_GROUP:
        newState.workoutConfigurations.manikinMuscleGroups =
          action.manikinMuscleGroups;
        break;
      case ActionTypes.LOAD_MUSCLES:
        newState.workoutConfigurations.muscles = action.muscles;
        break;
      case ActionTypes.LOAD_MUSCLE_TARGET_TYPES:
        newState.workoutConfigurations.muscleTargetTypes =
          action.muscleTargetTypes;
        break;
      case ActionTypes.LOAD_PARAMETER_TYPES:
        newState.workoutConfigurations.parameterTypes = action.parameterTypes;
        break;
      case ActionTypes.LOAD_PHASES:
        newState.workoutConfigurations.phases = action.phases;
        break;
      case ActionTypes.LOAD_TRAINING_SET_TYPES:
        newState.workoutConfigurations.trainingSetTypes =
          action.trainingSetTypes;
        break;
      case ActionTypes.LOAD_WORKOUT_CATEGORIES:
        newState.workoutConfigurations.workoutCategories =
          action.workoutCategories;
        break;
      case ActionTypes.LOAD_WORKOUT_EQUIPMENT:
        newState.workoutConfigurations.workoutEquipment =
          action.workoutEquipment;
        break;
      case ActionTypes.LOAD_EXERCISE_IMAGES:
        newState.workoutConfigurations.exerciseImages.push(action.images);
        break;
      case ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE:
        newState.exerciseSearchValue = action.searchValue;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  currentLocation: string;
  activePage: ApplicationRouteProp | undefined;
  userIsValidated: boolean;
  userEmail: string;
  setupNewUser: boolean;
  userProfile: UserProfileVO | null;
  openUserProfileDialog: boolean;
  selectedNavTestId: string;
  exerciseSearchValue: string;
  workoutConfigurations: {
    exercises: ExerciseVO[];
    exerciseImages: ExerciseImage[];
    routineTemplates: RoutineTemplateVO[];
    gripTypes: GripTypeVO[];
    gripWidths: GripWidthVO[];
    trainingSetTypes: TrainingSetTypeVO[];
    phases: PhaseVO[];
    workoutCategories: WorkoutCategoryVO[];
    manikinMuscleGroups: ManikinMuscleGroupVO[];
    muscles: MuscleVO[];
    muscleTargetTypes: MuscleTargetTypeVO[];
    parameterTypes: ParameterTypeVO[];
    workoutEquipment: WorkoutEquipmentVO[];
  };
}
