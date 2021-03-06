import { Store } from 'redux';
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
} from '../creators/load-workout-configs';

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
