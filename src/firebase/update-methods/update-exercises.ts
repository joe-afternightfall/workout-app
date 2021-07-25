import { getAllExercises } from '../../services/exercise-service';
import { Store } from 'redux';
import { loadExercises } from '../../creators/exercise';
import { ExerciseVO } from '../../configs/models/ExerciseVO';

export const updateExercises = async (store: Store): Promise<void> => {
  const exercises = await getAllExercises();

  if (exercises) {
    const exercises1 = buildVO(exercises);
    store.dispatch(loadExercises(exercises1));
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
      workoutCategoryId: exercises[key].workoutCategoryId,
    };
  });
}
