import { getAllExercises } from '../../services/exercise-service';
import { Store } from 'redux';
import { loadExercises } from '../../creators/exercise';
import { ExerciseVO } from '../../configs/models/ExerciseVO';

export const updateExercises = async (store: Store) => {
  const exercises = await getAllExercises();

  if (exercises) {
    store.dispatch(loadExercises(buildVO(exercises)));
  } else {
    store.dispatch(loadExercises([]));
  }
};

function buildVO(exercises: any): ExerciseVO[] {
  return Object.keys(exercises).map((key: string): ExerciseVO => {
    return {
      firebaseId: key,
      id: exercises[key].id,
      name: exercises[key].name,
    };
  });
}