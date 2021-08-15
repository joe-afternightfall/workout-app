import { Store } from 'redux';
import {
  loadCircuitTypes,
  loadExerciseTypes,
  loadCategoryTypes,
} from '../creators/workout-configurations';
import { loadUsersWorkouts } from '../creators/user-info';
import { getWorkoutsForUser } from '../services/workout-service';
import { getAllCircuitTypes } from '../services/workout-configurations/circuit-types-service';
import { getAllCategoryTypes } from '../services/workout-configurations/category-types-service';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export const updateCategoryTypes = async (store: Store): Promise<void> => {
  const categoryTypes = await getAllCategoryTypes();
  store.dispatch(loadCategoryTypes(categoryTypes));
};

export const updateCircuitTypes = async (store: Store): Promise<void> => {
  const circuits: CircuitTypeVO[] = await getAllCircuitTypes();
  store.dispatch(loadCircuitTypes(circuits));
};

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();
  store.dispatch(loadExerciseTypes(exercises));
};

export const updateUserWorkouts = async (store: Store): Promise<void> => {
  const workouts = await getWorkoutsForUser(
    store.getState().applicationState.userEmail
  );
  store.dispatch(loadUsersWorkouts(workouts));
};
