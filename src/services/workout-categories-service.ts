import firebase from 'firebase';
import { WorkoutCategoryDAO } from '../configs/models/WorkoutCategoryDAO';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDAO } from '../configs/models/ExerciseDAO';
import { WORKOUT_CATEGORIES_ROUTE } from '../configs/constants/firebase-routes';

export const createNewWorkoutCategory = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(WORKOUT_CATEGORIES_ROUTE);
  const newRef = ref.push();

  const muscleGroupDAO = new WorkoutCategoryDAO(uuidv4(), name);

  return await newRef.set(muscleGroupDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getAllWorkoutCategories = async (): Promise<ExerciseDAO> => {
  return await firebase
    .database()
    .ref(WORKOUT_CATEGORIES_ROUTE)
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const updateWorkoutCategory = async (
  id: string,
  value: string
): Promise<void> => {
  return await firebase
    .database()
    .ref(WORKOUT_CATEGORIES_ROUTE)
    .child(id)
    .update(
      {
        name: value,
      },
      (error: Error | null) => {
        if (error) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    );
};

export const deleteWorkoutCategory = async (id: string): Promise<void> => {
  return await firebase
    .database()
    .ref(WORKOUT_CATEGORIES_ROUTE)
    .child(id)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
