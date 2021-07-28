import { RouteProp } from '../configs/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ExerciseVO } from '../configs/models/ExerciseVO';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { WorkoutCategoryVO } from '../configs/models/WorkoutCategoryVO';

export default {
  reducer(
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        newState.activePage = getPageInfo(newState.currentLocation);
        break;
      // case ActionTypes.UPDATE_WARM_UPS: {
      //   newState.warmUps = [...newState.warmUps, action.exercise];
      //   break;
      // }
      case ActionTypes.LOAD_EXERCISES:
        newState.exercises = action.exercises;
        break;
      case ActionTypes.LOAD_WORKOUT_CATEGORIES:
        newState.workoutCategories = action.workoutCategories;
        break;
      case ActionTypes.UPDATE_WORKOUT_DATE:
        newState.workoutDate = action.date;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  currentLocation: string;
  activePage: RouteProp | undefined;
  exercises: ExerciseVO[];
  workoutCategories: WorkoutCategoryVO[];
  workoutDate: Date;
}
