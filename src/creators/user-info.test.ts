import {
  loadUserInfo,
  setupNewUser,
  toggleUserProfileDialog,
  validatedUser,
} from './user-info';
import { chance } from 'jest-chance';
import { ActionTypes } from './actions';
import { UserProfileVO, Workout } from 'workout-app-common-core';

describe('user info creator', () => {
  it('should return toggleUserProfileDialog action', () => {
    const shouldOpen = chance.bool();
    const response = toggleUserProfileDialog(shouldOpen);

    expect(response).toEqual({
      type: ActionTypes.TOGGLE_USER_PROFILE_DIALOG,
      shouldOpen: shouldOpen,
    });
  });

  it('should return loadUserInfo action', () => {
    const userProfileVO = new UserProfileVO(
      chance.string(),
      chance.string(),
      chance.string(),
      chance.string(),
      chance.string(),
      {
        feet: chance.string(),
        inches: chance.string(),
      },
      [
        {
          id: chance.string(),
          weight: chance.string(),
          lastUpdatedOn: chance.string(),
        },
      ],
      chance.string(),
      chance.string(),
      []
    );

    const response = loadUserInfo(userProfileVO);

    expect(response).toEqual({
      type: ActionTypes.LOAD_USER_INFO,
      userProfile: userProfileVO,
    });
  });

  it('should return validatedUser action', () => {
    const email = chance.string();

    const response = validatedUser(email);

    expect(response).toEqual({
      type: ActionTypes.VALIDATED_USER,
      email: email,
    });
  });

  it('should return setupNewUser action', () => {
    const email = chance.string();

    const response = setupNewUser(email);

    expect(response).toEqual({
      type: ActionTypes.SETUP_NEW_USER,
      email: email,
    });
  });
});
