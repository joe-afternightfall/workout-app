import { ActionTypes } from './actions';
import { NewCircuitProps } from '../components/top-level-components/workout/WorkoutScreen';

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
  circuit: NewCircuitProps;
}

export const addCircuit = (circuit: NewCircuitProps): AddCircuitAction => {
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
