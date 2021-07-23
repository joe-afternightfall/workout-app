import firebase from 'firebase';
import { MuscleGroupDAO } from '../configs/models/MuscleGroupDAO';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDAO } from '../configs/models/ExerciseDAO';

export const createNewWorkoutCategory = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(`/muscle-groups`);
  const newRef = ref.push();

  const muscleGroupDAO = new MuscleGroupDAO(uuidv4(), name);

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
    .ref('/workout-categories')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const updateWorkoutCategory = async (id: string, value: string) => {
  return await firebase
    .database()
    .ref('/workout-categories')
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
    .ref('/workout-categories')
    .child(id)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
