import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { EXERCISE_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { ExerciseTypeVO } from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { ExerciseTypeDAO } from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

export const createNewExerciseType = async (
  name: string,
  workoutCategoryId: string
): Promise<void> => {
  const ref = firebase.database().ref(EXERCISE_TYPES_ROUTE);
  const newRef = ref.push();
  const exerciseTypeDAO = new ExerciseTypeDAO(
    uuidv4(),
    name,
    workoutCategoryId
  );

  return await newRef.set(exerciseTypeDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

// todo: how to create firebase return type and use in firebase init
export const getAllExerciseTypes = async (): Promise<ExerciseTypeVO> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const updateExerciseType = async (
  firebaseId: string,
  exerciseName: string,
  workoutCategoryId: string
): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .update(
      {
        name: exerciseName,
        workoutCategoryId: workoutCategoryId,
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

export const deleteExerciseType = async (firebaseId: string): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
