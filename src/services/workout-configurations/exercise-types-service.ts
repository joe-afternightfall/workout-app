import firebase from 'firebase';
import { exerciseTypeSnapToVO } from '../../utils/vo-builder';
import { EXERCISE_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { ExerciseTypeVO } from 'workout-app-common-core';

export const getAllExerciseTypes = async (): Promise<ExerciseTypeVO[]> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return exerciseTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};
