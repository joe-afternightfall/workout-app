import { v4 as uuidv4 } from 'uuid';
import {
  WorkoutVO,
  CircuitTypeVO,
  UserProfileVO,
  ExerciseTypeVO,
  CircuitTemplateVO,
} from 'workout-app-common-core/core/src';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { MobileRouteProp } from '../configs/constants/mobile-routes';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import {
  CircuitExercise,
  CircuitExerciseSet,
  WorkoutCircuitProps,
} from '../components/top-level-components/workout-screen/WorkoutScreen';
import { StopwatchState } from '../components/top-level-components/workout-screen/stopwatch/Stopwatch';

function findCircuit(
  state: ApplicationState,
  circuitId: string
): WorkoutCircuitProps | undefined {
  const circuits = state.workout.circuits;
  return circuits.find(
    (circuit: WorkoutCircuitProps) => circuit.id === circuitId
  );
}

export default {
  reducer: function (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE: {
        newState.currentLocation = action.payload.location.pathname;
        const activePage = getPageInfo(newState.currentLocation);
        newState.activePage = activePage;
        if (activePage) {
          newState.selectedNavTestId = activePage.testId;
        }
        break;
      }
      case ActionTypes.VALIDATED_USER:
        newState.userIsValidated = true;
        newState.userEmail = action.email;
        break;
      case ActionTypes.SETUP_NEW_USER:
        newState.setupNewUser = true;
        newState.userEmail = action.email;
        break;
      case ActionTypes.LOAD_CIRCUIT_TEMPLATES:
        newState.circuitTemplates = action.templates;
        break;
      case ActionTypes.LOAD_USER_WORKOUTS:
        newState.userWorkouts = action.workouts;
        break;
      case ActionTypes.LOAD_USER_INFO:
        newState.userProfile = action.userProfile;
        newState.setupNewUser = false;
        newState.openUserProfileDialog = false;
        break;
      case ActionTypes.TOGGLE_USER_PROFILE_DIALOG:
        newState.openUserProfileDialog = action.shouldOpen;
        break;
      case ActionTypes.CLEAR_USER_INFO:
        newState.userProfile = action.userProfile;
        newState.userIsValidated = false;
        break;
      case ActionTypes.LOAD_EXERCISE_TYPES:
        newState.workoutConfigurations.exerciseTypes = action.exerciseTypes;
        break;
      case ActionTypes.LOAD_CIRCUIT_TYPES:
        newState.workoutConfigurations.circuitTypes = action.circuitTypes;
        break;
      case ActionTypes.UPDATE_WORKOUT_DATE:
        newState.workout.date = action.date;
        break;
      case ActionTypes.ADD_CIRCUIT:
        newState.workout.circuits = [
          ...newState.workout.circuits,
          action.circuit,
        ];
        newState.expandedAccordion = action.circuit.id;
        break;
      case ActionTypes.CLEAR_WORKOUT_SCREEN:
        newState.workout.circuits = [];
        break;
      case ActionTypes.TOGGLE_ACCORDION:
        newState.expandedAccordion = action.panel;
        break;
      case ActionTypes.DELETE_CIRCUIT:
        {
          const circuits = newState.workout.circuits;
          const foundCircuit = circuits.find(
            (circuit: WorkoutCircuitProps) => circuit.id === action.id
          );
          if (foundCircuit) {
            const foundIndex = circuits.indexOf(foundCircuit);
            circuits.splice(foundIndex, 1);
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.ADD_EXERCISE_TO_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            newState.workout.circuits[foundIndex].exercises = [
              ...foundCircuit.exercises,
              {
                id: uuidv4(),
                exerciseId: action.exerciseId,
                sets: [
                  {
                    id: uuidv4(),
                    setNumber: 1,
                    weight: '',
                    reps: '',
                    time: {
                      hours: '',
                      minutes: '',
                      seconds: '',
                    },
                    distance: {
                      value: '',
                      unit: '',
                    },
                    markedDone: false,
                  },
                ],
              },
            ];
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const circuitIndex =
              newState.workout.circuits.indexOf(foundCircuit);
            const exercises = newState.workout.circuits[circuitIndex].exercises;

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
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              let numberOfSets = foundExercise.sets.length + 1;
              foundExercise.sets = [
                ...foundExercise.sets,
                {
                  id: uuidv4(),
                  setNumber: numberOfSets++,
                  weight: '',
                  reps: '',
                  time: {
                    hours: '',
                    minutes: '',
                    seconds: '',
                  },
                  distance: {
                    value: '',
                    unit: '',
                  },
                  markedDone: false,
                },
              ];
            }
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
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
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.TOGGLE_EXERCISE_SET_DONE:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
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
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.UPDATE_WORKOUT_SET_FIELD:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                foundSet[action.name] = action.value;
              }
            }
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.UPDATE_TIME_SET_FIELD:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                foundSet.time = {
                  ...foundSet.time,
                  [action.name]: action.value,
                };
              }
            }
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.UPDATE_DISTANCE_SET_FIELD:
        {
          const foundCircuit = findCircuit(newState, action.circuitId);
          if (foundCircuit) {
            const foundIndex = newState.workout.circuits.indexOf(foundCircuit);
            const foundExercise = newState.workout.circuits[
              foundIndex
            ].exercises.find(
              (exercise: CircuitExercise) =>
                exercise.exerciseId === action.exerciseId
            );
            if (foundExercise) {
              const foundSet = foundExercise.sets.find(
                (set: CircuitExerciseSet) => set.id === action.setId
              );

              if (foundSet) {
                foundSet.distance = {
                  ...foundSet.distance,
                  [action.name]: action.value,
                };
              }
            }
            return {
              ...newState,
              workout: {
                ...newState.workout,
                circuits: [...newState.workout.circuits],
              },
            };
          }
        }
        break;
      case ActionTypes.STOP_STOPWATCH:
        newState.stopwatch.running = false;
        if (newState.stopwatch.watch) {
          newState.stopwatch.watch = clearInterval(newState.stopwatch.watch);
        }
        break;
      case ActionTypes.START_STOPWATCH:
        newState.stopwatch.running = true;
        newState.stopwatch.watch = action.watch;
        break;
      case ActionTypes.RESET_STOPWATCH:
        newState.stopwatch = {
          ...newState.stopwatch,
          currentTimeMs: 0,
          currentTimeSec: 0,
          currentTimeMin: 0,
        };
        break;
      case ActionTypes.UPDATE_STOPWATCH:
        newState.stopwatch = action.stopwatchState;
        break;
      case ActionTypes.TOGGLE_MUSCLE_GROUP: {
        const foundId = newState.selectedMuscleGroupIds.find(
          (id: string) => id === action.muscleGroupId
        );
        if (foundId) {
          const foundIndex = newState.selectedMuscleGroupIds.indexOf(foundId);
          newState.selectedMuscleGroupIds.splice(foundIndex, 1);
          return {
            ...newState,
            selectedMuscleGroupIds: [...newState.selectedMuscleGroupIds],
          };
        } else {
          newState.selectedMuscleGroupIds = [
            ...newState.selectedMuscleGroupIds,
            action.muscleGroupId,
          ];
        }
        break;
      }
      case ActionTypes.APPLY_HOVER_STYLES_TO_MUSCLE_GROUP:
        newState.applyHoverStylesToMuscleGroup = action.groupId;
        break;
      case ActionTypes.CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP:
        newState.applyHoverStylesToMuscleGroup = '';
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  currentLocation: string;
  activePage: MobileRouteProp | undefined;
  userIsValidated: boolean;
  userEmail: string;
  circuitTemplates: CircuitTemplateVO[];
  // todo: rename userWorkouts to "pastWorkouts"
  userWorkouts: WorkoutVO[];
  setupNewUser: boolean;
  userProfile: UserProfileVO | null;
  openUserProfileDialog: boolean;
  expandedAccordion: string;
  workoutConfigurations: {
    exerciseTypes: ExerciseTypeVO[];
    circuitTypes: CircuitTypeVO[];
  };
  workout: {
    date: Date;
    time: string;
    circuits: WorkoutCircuitProps[];
  };
  stopwatch: StopwatchState;
  selectedMuscleGroupIds: string[];
  applyHoverStylesToMuscleGroup: string;
  selectedNavTestId: string;
}
