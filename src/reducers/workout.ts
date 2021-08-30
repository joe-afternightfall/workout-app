import { LOCATION_CHANGE } from 'connected-react-router';
import { WorkoutActions } from '../creators/actions-workout';

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
      default:
        break;
    }

    return newState;
  },
};

export interface WorkoutState {
  currentLocation: string;
}
