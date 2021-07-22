import { AnyAction } from 'redux';
import { RouteProp } from '../configs/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { Exercise } from '../configs/app-types';
import { ActionTypes } from '../creators/actions';
import { ExerciseVO } from '../configs/models/ExerciseVO';

export default {
  reducer(
    state: ApplicationState = {} as unknown as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        newState.activePage = getPageInfo(newState.currentLocation);
        break;
      case ActionTypes.UPDATE_WARM_UPS: {
        newState.warmUps = [...newState.warmUps, action.exercise];
        break;
      }
      case ActionTypes.LOAD_EXERCISES:
        newState.exercises = action.exercises;
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
  warmUps: Exercise[];
  exercises: ExerciseVO[];
}
