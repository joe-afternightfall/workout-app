import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDAO } from '../configs/models/ExerciseDAO';
import { EXERCISES_ROUTE } from '../configs/constants/firebase-routes';

export const createNewExercise = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(EXERCISES_ROUTE);
  const newRef = ref.push();

  const exerciseDAO = new ExerciseDAO(uuidv4(), name);

  return await newRef.set(exerciseDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getAllExercises = async (): Promise<ExerciseDAO> => {
  return await firebase
    .database()
    .ref(EXERCISES_ROUTE)
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const updateExercise = async (
  id: string,
  value: string
): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISES_ROUTE)
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

export const deleteExercise = async (id: string): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISES_ROUTE)
    .child(id)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
