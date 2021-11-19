import {
  UserProfileDAO,
  UserProfileVO,
  Workout,
} from 'workout-app-common-core';

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
      workouts: mapWorkoutSnapshotToVO(
        snap[key].workouts as unknown as WorkoutSnapshot
      ),
    };
  });
};

export interface WorkoutSnapshot {
  [key: string]: Workout;
}

export const mapWorkoutSnapshotToVO = (snap: WorkoutSnapshot): Workout[] => {
  return (
    snap &&
    Object.keys(snap).map((key: string) => {
      return {
        id: snap[key].id,
        date: snap[key].date,
        startTime: snap[key].startTime,
        endTime: snap[key].endTime,
        routine: snap[key].routine,
      };
    })
  );
};
