import { RouteProp } from '../configs/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ExerciseVO } from '../configs/models/ExerciseVO';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { WorkoutCategoryVO } from '../configs/models/WorkoutCategoryVO';
import { NewCircuitProps } from '../components/top-level-components/workout/WorkoutScreen';

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
      case ActionTypes.LOAD_EXERCISES:
        newState.exercises = action.exercises;
        break;
      case ActionTypes.LOAD_WORKOUT_CATEGORIES:
        newState.workoutCategories = action.workoutCategories;
        break;
      case ActionTypes.UPDATE_WORKOUT_DATE:
        newState.workoutDate = action.date;
        break;
      case ActionTypes.ADD_CIRCUIT:
        newState.circuits = [...newState.circuits, action.circuit];
        break;
      case ActionTypes.DELETE_CIRCUIT:
        {
          const circuits = newState.circuits;
          const foundCircuit = circuits.find(
            (circuit: NewCircuitProps) => circuit.id === action.id
          );
          if (foundCircuit) {
            const foundIndex = circuits.indexOf(foundCircuit);
            circuits.splice(foundIndex, 1);
            newState.circuits = circuits;
            return {
              ...newState,
              circuits: [...newState.circuits],
            };
          }
        }
        break;
      case ActionTypes.ADD_EXERCISE_TO_CIRCUIT:
        {
          const circuits = newState.circuits;
          const foundCircuit = circuits.find(
            (circuit) => circuit.id === action.circuitId
          );

          if (foundCircuit) {
            const foundIndex = circuits.indexOf(foundCircuit);
            newState.circuits[foundIndex].exerciseIds = [
              ...foundCircuit.exerciseIds,
              action.exerciseId,
            ];
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
  exercises: ExerciseVO[];
  workoutCategories: WorkoutCategoryVO[];
  workoutDate: Date;
  circuits: NewCircuitProps[];
}
