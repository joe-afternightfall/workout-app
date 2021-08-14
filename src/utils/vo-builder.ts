import { ExerciseTypeDAO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CircuitTypeDAO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeDAO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { CategoryTypeDAO } from '../configs/models/workout-configurations/category-type/CategoryTypeDAO';
import { CategoryTypeVO } from '../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { WorkoutDAO } from '../configs/models/WorkoutDAO';
import { WorkoutVO } from '../configs/models/WorkoutVO';
import { UserProfileDAO } from '../configs/models/UserProfileDAO';
import { UserProfileVO } from '../configs/models/UserProfileVO';

export interface ExerciseTypeSnapshot {
  [key: string]: ExerciseTypeDAO;
}
export const exerciseTypeSnapToVO = (
  snap: ExerciseTypeSnapshot
): ExerciseTypeVO[] => {
  return Object.keys(snap).map((key: string): ExerciseTypeVO => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
      workoutCategoryId: snap[key].workoutCategoryId,
      setType: snap[key].setType,
    };
  });
};

export interface CircuitTypeSnapshot {
  [key: string]: CircuitTypeDAO;
}

export const circuitTypeSnapToVO = (
  snap: CircuitTypeSnapshot
): CircuitTypeVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
    };
  });
};

export interface CategoryTypeSnapshot {
  [key: string]: CategoryTypeDAO;
}

export const categoryTypeSnapToVO = (
  snap: CategoryTypeSnapshot
): CategoryTypeVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
    };
  });
};

export interface WorkoutsSnapshot {
  [key: string]: WorkoutDAO;
}

export const workoutsSnapToVO = (snap: WorkoutsSnapshot): WorkoutVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      username: snap[key].username,
      circuits: snap[key].circuits,
      workoutDate: snap[key].workoutDate,
    };
  });
};

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
    };
  });
};
