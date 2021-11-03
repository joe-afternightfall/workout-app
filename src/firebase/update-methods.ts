import { Store } from 'redux';
import {
  loadCircuitTypes,
  loadExerciseTypes,
} from '../creators/workout-configurations';
import { loadUsersWorkouts } from '../creators/user-info';
import { getWorkoutsForUser } from '../services/workout-service';
import { getAllCircuitTypes } from '../services/workout-configurations/circuit-types-service';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { getCircuitTemplates } from '../services/circuit-template';
import { loadCircuitTemplates } from '../creators/circuit-template';
import { CircuitTypeVO } from '../configs/old-models/CircuitTypeVO';
import { ExerciseTypeVO } from '../configs/old-models/ExerciseTypeVO';
import { CircuitTemplateVO } from '../configs/old-models/CircuitTemplateVO';
import {
  ExerciseVO,
  RoutineTemplateVO,
  getAllActiveGripTypes,
  getAllActiveGripWidths,
  getAllActiveManikinMuscleGroups,
  getAllActiveMuscles,
  getAllActiveMuscleTargetTypes,
  getAllActiveParameterTypes,
  getAllActivePhases,
  getAllActiveTrainingSetTypes,
  getAllActiveWorkoutCategories,
  getAllActiveWorkoutEquipment,
  getAllExercises,
  getAllRoutineTemplates,
} from 'workout-app-common-core';
import {
  loadExercises,
  loadGripTypes,
  loadGripWidths,
  loadManikinMuscleGroups,
  loadMuscles,
  loadMuscleTargetTypes,
  loadParameterTypes,
  loadPhases,
  loadRoutineTemplates,
  loadTrainingSetTypes,
  loadWorkoutCategories,
  loadWorkoutEquipment,
} from '../creators/new-workout/load-workout-configs';

export const updateCircuitTypes = async (store: Store): Promise<void> => {
  const circuits: CircuitTypeVO[] = await getAllCircuitTypes();
  circuits.sort((a: CircuitTypeVO, b: CircuitTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadCircuitTypes(circuits));
};

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();
  exercises.sort((a: ExerciseTypeVO, b: ExerciseTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadExerciseTypes(exercises));
};

export const updateUserWorkouts = async (store: Store): Promise<void> => {
  const email = store.getState().applicationState.userEmail;
  if (email) {
    const workouts = await getWorkoutsForUser(email);
    store.dispatch(loadUsersWorkouts(workouts));
  }
};

export const updateCircuitTemplates = async (store: Store): Promise<void> => {
  const templates: CircuitTemplateVO[] = await getCircuitTemplates();
  store.dispatch(loadCircuitTemplates(templates));
};

export const updateRoutineTemplates = async (store: Store): Promise<void> => {
  const templates: RoutineTemplateVO[] = await getAllRoutineTemplates();
  store.dispatch(loadRoutineTemplates(templates));
};

export const updateExercises = async (store: Store): Promise<void> => {
  const exercises: ExerciseVO[] = await getAllExercises();
  store.dispatch(loadExercises(exercises));
};

export const updateGripTypes = async (store: Store): Promise<void> => {
  const activeGripTypes = await getAllActiveGripTypes();
  store.dispatch(loadGripTypes(activeGripTypes));
};

export const updateGripWidths = async (store: Store): Promise<void> => {
  const activeGripWidths = await getAllActiveGripWidths();
  store.dispatch(loadGripWidths(activeGripWidths));
};

export const updateManikinMuscleGroups = async (
  store: Store
): Promise<void> => {
  const activeManikinMuscleGroups = await getAllActiveManikinMuscleGroups();
  store.dispatch(loadManikinMuscleGroups(activeManikinMuscleGroups));
};

export const updateMuscles = async (store: Store): Promise<void> => {
  const activeMuscles = await getAllActiveMuscles();
  store.dispatch(loadMuscles(activeMuscles));
};

export const updateMuscleTargetTypes = async (store: Store): Promise<void> => {
  const activeMuscleTargetTypes = await getAllActiveMuscleTargetTypes();
  store.dispatch(loadMuscleTargetTypes(activeMuscleTargetTypes));
};

export const updateParameterTypes = async (store: Store): Promise<void> => {
  const activeParameterTypes = await getAllActiveParameterTypes();
  store.dispatch(loadParameterTypes(activeParameterTypes));
};

export const updatePhases = async (store: Store): Promise<void> => {
  const activePhases = await getAllActivePhases();
  store.dispatch(loadPhases(activePhases));
};

export const updateTrainingSetTypes = async (store: Store): Promise<void> => {
  const activeTrainingSetTypes = await getAllActiveTrainingSetTypes();
  store.dispatch(loadTrainingSetTypes(activeTrainingSetTypes));
};

export const updateWorkoutCategories = async (store: Store): Promise<void> => {
  const activeWorkoutCategories = await getAllActiveWorkoutCategories();
  store.dispatch(loadWorkoutCategories(activeWorkoutCategories));
};

export const updateWorkoutEquipment = async (store: Store): Promise<void> => {
  const activeWorkoutEquipment = await getAllActiveWorkoutEquipment();
  store.dispatch(loadWorkoutEquipment(activeWorkoutEquipment));
};
