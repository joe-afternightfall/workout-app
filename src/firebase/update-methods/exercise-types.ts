import { Store } from 'redux';
import { loadExerciseTypes } from '../../creators/workout-configurations';
import { ExerciseTypeVO } from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { getAllExerciseTypes } from '../../services/workout-configurations/exercise-types-service';

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises = await getAllExerciseTypes();

  if (exercises) {
    store.dispatch(loadExerciseTypes(buildVO(exercises)));
  } else {
    store.dispatch(loadExerciseTypes([]));
  }
};

// todo: make strict typing for any
function buildVO(exercises: any): ExerciseTypeVO[] {
  return Object.keys(exercises).map((key: string): ExerciseTypeVO => {
    return {
      firebaseId: key,
      id: exercises[key].id,
      name: exercises[key].name,
      workoutCategoryId: exercises[key].workoutCategoryId,
      setType: exercises[key].setType,
    };
  });
}
