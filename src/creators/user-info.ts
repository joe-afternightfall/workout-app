import { ActionTypes } from './actions';

export interface UpdateLoggedInUserAction {
  type: ActionTypes.LOGGED_IN_USER;
  username: string;
}

export const updateLoggedInUser = (
  username: string
): UpdateLoggedInUserAction => {
  return {
    type: ActionTypes.LOGGED_IN_USER,
    username: username,
  };
};

export interface ClearUserInfoAction {
  type: ActionTypes.CLEAR_USER_INFO;
}

export const clearUserInfo = (): ClearUserInfoAction => {
  return {
    type: ActionTypes.CLEAR_USER_INFO,
  };
};
