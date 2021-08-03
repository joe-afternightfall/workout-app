import { ActionTypes } from './actions';
import { WorkoutCircuitProps } from '../components/top-level-components/workout/WorkoutScreen';

export interface UpdateWorkoutDateAction {
  type: ActionTypes.UPDATE_WORKOUT_DATE;
  date: Date;
}

export const updateWorkoutDate = (date: Date): UpdateWorkoutDateAction => {
  return {
    type: ActionTypes.UPDATE_WORKOUT_DATE,
    date: date,
  };
};

export interface AddCircuitAction {
  type: ActionTypes.ADD_CIRCUIT;
  circuit: WorkoutCircuitProps;
}

export const addCircuit = (circuit: WorkoutCircuitProps): AddCircuitAction => {
  return {
    type: ActionTypes.ADD_CIRCUIT,
    circuit: circuit,
  };
};

export interface DeleteCircuitAction {
  type: ActionTypes.DELETE_CIRCUIT;
  id: string;
}

export const deleteCircuit = (id: string): DeleteCircuitAction => {
  return {
    type: ActionTypes.DELETE_CIRCUIT,
    id: id,
  };
};

export interface AddExerciseToCircuitAction {
  type: ActionTypes.ADD_EXERCISE_TO_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const addExerciseToCircuit = (
  circuitId: string,
  exerciseId: string
): AddExerciseToCircuitAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_TO_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface DeleteExerciseFromCircuitAction {
  type: ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const deleteExerciseFromCircuit = (
  circuitId: string,
  exerciseId: string
): DeleteExerciseFromCircuitAction => {
  return {
    type: ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface AddExerciseSetToCircuitAction {
  type: ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const addExerciseSetToCircuit = (
  circuitId: string,
  exerciseId: string
): AddExerciseSetToCircuitAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface DeleteExerciseSetFromCircuitAction {
  type: ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT;
  setId: string;
  circuitId: string;
  exerciseId: string;
}

export const deleteExerciseSetFromCircuit = (
  setId: string,
  circuitId: string,
  exerciseId: string
): DeleteExerciseSetFromCircuitAction => {
  return {
    type: ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT,
    setId: setId,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface ToggleExerciseSetAsDoneAction {
  type: ActionTypes.TOGGLE_EXERCISE_SET_DONE;
  setId: string;
  circuitId: string;
  exerciseId: string;
}

export const toggleExerciseSetAsDone = (
  setId: string,
  circuitId: string,
  exerciseId: string
): ToggleExerciseSetAsDoneAction => {
  return {
    type: ActionTypes.TOGGLE_EXERCISE_SET_DONE,
    setId: setId,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface UpdateWorkoutSetFieldAction {
  type: ActionTypes.UPDATE_WORKOUT_SET_FIELD;
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'weight' | 'reps';
  value: string;
}

export const updateWorkoutSetField = (
  circuitId: string,
  exerciseId: string,
  setId: string,
  name: 'weight' | 'reps',
  value: string
): UpdateWorkoutSetFieldAction => {
  return {
    type: ActionTypes.UPDATE_WORKOUT_SET_FIELD,
    circuitId: circuitId,
    exerciseId: exerciseId,
    setId: setId,
    name: name,
    value: value,
  };
};
