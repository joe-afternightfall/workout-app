import { ActionTypes } from './actions';
import { UserProfileVO } from '../configs/models/UserProfileVO';
import { WorkoutVO } from '../configs/models/WorkoutVO';

export interface ClearUserInfoAction {
  type: ActionTypes.CLEAR_USER_INFO;
  userProfile: UserProfileVO;
}

export const clearUserInfo = (): ClearUserInfoAction => {
  return {
    type: ActionTypes.CLEAR_USER_INFO,
    userProfile: {
      firebaseId: '',
      id: '',
      email: '',
      profileIcon: '',
      displayName: '',
      height: {
        feet: '',
        inches: '',
      },
      weights: [],
      dateOfBirth: '',
      lastUpdatedOn: '',
    },
  };
};

export interface ToggleUserProfileDialogAction {
  type: ActionTypes.TOGGLE_USER_PROFILE_DIALOG;
  shouldOpen: boolean;
}

export const toggleUserProfileDialog = (
  shouldOpen: boolean
): ToggleUserProfileDialogAction => {
  return {
    type: ActionTypes.TOGGLE_USER_PROFILE_DIALOG,
    shouldOpen: shouldOpen,
  };
};

export interface LoadUserInfoAction {
  type: ActionTypes.LOAD_USER_INFO;
  userProfile: UserProfileVO;
}

export const loadUserInfo = (
  userProfile: UserProfileVO
): LoadUserInfoAction => {
  return {
    type: ActionTypes.LOAD_USER_INFO,
    userProfile: userProfile,
  };
};

export interface ValidatedUserAction {
  type: ActionTypes.VALIDATED_USER;
  email: string;
}

export const validatedUser = (email: string): ValidatedUserAction => {
  return {
    type: ActionTypes.VALIDATED_USER,
    email: email,
  };
};

export interface SetupNewUserAction {
  type: ActionTypes.SETUP_NEW_USER;
  email: string;
}

export const setupNewUser = (email: string): SetupNewUserAction => {
  return {
    type: ActionTypes.SETUP_NEW_USER,
    email: email,
  };
};

export interface LoadUsersWorkoutsAction {
  type: ActionTypes.LOAD_USER_WORKOUTS;
  workouts: WorkoutVO[];
}

export const loadUsersWorkouts = (
  workouts: WorkoutVO[]
): LoadUsersWorkoutsAction => {
  return {
    type: ActionTypes.LOAD_USER_WORKOUTS,
    workouts: workouts,
  };
};
