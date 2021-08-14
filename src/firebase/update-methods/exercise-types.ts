import { Store } from 'redux';
import { loadExerciseTypes } from '../../creators/workout-configurations';
import { ExerciseTypeVO } from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { getAllExerciseTypes } from '../../services/workout-configurations/exercise-types-service';

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();

  if (exercises) {
    store.dispatch(loadExerciseTypes(exercises));
  } else {
    store.dispatch(loadExerciseTypes([]));
  }
};
