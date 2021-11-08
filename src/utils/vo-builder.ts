import { UserProfileDAO, UserProfileVO } from 'workout-app-common-core';

export interface UserProfileSnapshot {
  [key: string]: UserProfileDAO;
}

export const userProfileSnapToVO = (
  snap: UserProfileSnapshot
): UserProfileVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      email: snap[key].email,
      profileIcon: snap[key].profileIcon,
      displayName: snap[key].displayName,
      height: snap[key].height,
      weights: snap[key].weights,
      dateOfBirth: snap[key].dateOfBirth,
      lastUpdatedOn: snap[key].lastUpdatedOn,
      workouts: snap[key].workouts,
    };
  });
};
