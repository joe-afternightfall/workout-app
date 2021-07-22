import firebase from 'firebase';
import { ExerciseDAO } from '../configs/models/ExerciseDAO';

export const createNewExercise = async (
  exercise: ExerciseDAO
): Promise<void> => {
  const ref = firebase.database().ref(`/exercises`);
  const newRef = ref.push();

  return await newRef.set(exercise, (error: Error | null) => {
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
