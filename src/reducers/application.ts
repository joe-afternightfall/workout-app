import { UserProfileVO } from 'workout-app-common-core';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { MobileRouteProp } from '../configs/constants/mobile-routes';
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
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  currentLocation: string;
  activePage: MobileRouteProp | undefined;
  userIsValidated: boolean;
  userEmail: string;
  setupNewUser: boolean;
  userProfile: UserProfileVO | null;
  openUserProfileDialog: boolean;
  applyHoverStylesToMuscleGroup: string;
  selectedNavTestId: string;
}
