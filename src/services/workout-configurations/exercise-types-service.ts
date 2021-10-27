import firebase from 'firebase';
import { exerciseTypeSnapToVO } from '../../utils/vo-builder';
import { EXERCISE_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { ExerciseTypeVO } from '../../configs/old-models/ExerciseTypeVO';

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
