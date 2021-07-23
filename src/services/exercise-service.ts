import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDAO } from '../configs/models/ExerciseDAO';

export const createNewExercise = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(`/exercises`);
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
    .ref('/exercises')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const deleteExercise = async (id: string): Promise<void> => {
  return await firebase
    .database()
    .ref('/exercises')
    .child(id)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
