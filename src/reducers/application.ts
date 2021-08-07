import { v4 as uuidv4 } from 'uuid';
import { RouteProp } from '../configs/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import {
  CircuitExercise,
  CircuitExerciseSet,
  WorkoutCircuitProps,
} from '../components/top-level-components/workout/WorkoutScreen';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CategoryTypeVO } from '../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

function findCircuit(
  state: ApplicationState,
  circuitId: string
): WorkoutCircuitProps | undefined {
  const circuits = state.circuits;
  return circuits.find(
    (circuit: WorkoutCircuitProps) => circuit.id === circuitId
  );
}

export default {
  reducer(
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        newState.activePage = getPageInfo(newState.currentLocation);
        break;
      case ActionTypes.LOGGED_IN_USER:
        newState.username = action.username;
        break;
      case ActionTypes.LOAD_EXERCISE_TYPES:
        newState.exerciseTypes = action.exerciseTypes;
        break;
      case ActionTypes.LOAD_CATEGORY_TYPES:
        newState.categoryTypes = action.categoryTypes;
        break;
      case ActionTypes.LOAD_CIRCUIT_TYPES:
        newState.circuitTypes = action.circuitTypes;
        break;
      case ActionTypes.UPDATE_WORKOUT_DATE:
        newState.workoutDate = action.date;
        break;
      case ActionTypes.ADD_CIRCUIT:
        newState.circuits = [...newState.circuits, action.circuit];
        newState.expandedAccordion = action.circuit.id;
        break;
      case ActionTypes.CLEAR_WORKOUT_SCREEN:
        newState.circuits = [];
        break;
      case ActionTypes.TOGGLE_ACCORDION:
        newState.expandedAccordion = action.panel;
        break;
      case ActionTypes.DELETE_CIRCUIT:
        {
          const circuits = newState.circuits;
          const foundCircuit = circuits.find(
            (circuit: WorkoutCircuitProps) => circuit.id === action.id
          );
          if (foundCircuit) {
            const foundIndex = circuits.indexOf(foundCircuit);
            circuits.splice(foundIndex, 1);
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.ADD_EXERCISE_TO_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.circuits.indexOf(foundCircuit);
            newState.circuits[foundIndex].exercises = [
              ...foundCircuit.exercises,
              {
                id: uuidv4(),
                exerciseId: action.exerciseId,
                sets: [
                  {
                    id: uuidv4(),
                    setNumber: 0,
                    weight: 0,
                    reps: 0,
                    markedDone: false,
                  },
                ],
              },
            ];
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const circuitIndex = newState.circuits.indexOf(foundCircuit);
            const exercises = newState.circuits[circuitIndex].exercises;

            const foundExercise = exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );

            if (foundExercise) {
              const exerciseIndex = exercises.indexOf(foundExercise);
              exercises.splice(exerciseIndex, 1);
            }

            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.circuits.indexOf(foundCircuit);
            const foundExercise = newState.circuits[foundIndex].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              let numberOfSets = foundExercise.sets.length;
              foundExercise.sets = [
                ...foundExercise.sets,
                {
                  id: uuidv4(),
                  setNumber: numberOfSets++,
                  weight: 0,
                  reps: 0,
                  markedDone: false,
                },
              ];
            }
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.circuits.indexOf(foundCircuit);
            const foundExercise = newState.circuits[foundIndex].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                const foundIndex = foundExercise.sets.indexOf(foundSet);
                foundExercise.sets.splice(foundIndex, 1);
              }
            }
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.TOGGLE_EXERCISE_SET_DONE:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.circuits.indexOf(foundCircuit);
            const foundExercise = newState.circuits[foundIndex].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                foundSet.markedDone = !foundSet.markedDone;
              }
            }
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.UPDATE_WORKOUT_SET_FIELD:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.circuits.indexOf(foundCircuit);
            const foundExercise = newState.circuits[foundIndex].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                if (action.name === 'weight') {
                  foundSet.weight = Number(action.value);
                } else {
                  foundSet.reps = Number(action.value);
                }
              }
            }
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  username: string;
  currentLocation: string;
  activePage: RouteProp | undefined;
  exerciseTypes: ExerciseTypeVO[];
  categoryTypes: CategoryTypeVO[];
  circuitTypes: CircuitTypeVO[];
  workoutDate: Date;
  circuits: WorkoutCircuitProps[];
  expandedAccordion: string;
}
