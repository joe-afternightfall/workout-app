import { LocationChangeAction } from 'connected-react-router';
import {
  ClearUserInfoAction,
  LoadUserInfoAction,
  SetupNewUserAction,
  ToggleUserProfileDialogAction,
  ValidatedUserAction,
} from './user-info';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  CLEAR_USER_INFO = 'CLEAR_USER_INFO',

  TOGGLE_USER_PROFILE_DIALOG = 'TOGGLE_USER_PROFILE_DIALOG',
  LOAD_USER_INFO = 'LOAD_USER_INFO',
  VALIDATED_USER = 'VALIDATED_USER',
  SETUP_NEW_USER = 'SETUP_NEW_USER',
}

export type ApplicationActions =
  | LocationChangeAction
  | ClearUserInfoAction
  | ToggleUserProfileDialogAction
  | LoadUserInfoAction
  | ValidatedUserAction
  | SetupNewUserAction;
