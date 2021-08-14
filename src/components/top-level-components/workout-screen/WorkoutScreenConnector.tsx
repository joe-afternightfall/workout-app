import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import WorkoutScreen, { WorkoutScreenProps } from './WorkoutScreen';
import { State } from '../../../configs/redux/store';
import {
  addExerciseSetToCircuit,
  addExerciseToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
  deleteExerciseSetFromCircuit,
  toggleExerciseSetAsDone,
} from '../../../creators/workout';
import { ThunkDispatch } from 'redux-thunk';
import { saveWorkout } from '../../../services/workout-service';

const mapStateToProps = (state: State): WorkoutScreenProps => {
  return {
    circuits: state.applicationState.workout.circuits,
  } as unknown as WorkoutScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutScreenProps =>
  ({
    deleteCircuitHandler: (id: string) => {
      dispatch(deleteCircuit(id));
    },
    addExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseToCircuit(circuitId, exerciseId));
    },
    deleteExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(deleteExerciseFromCircuit(circuitId, exerciseId));
    },
    saveWorkoutHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(saveWorkout());
    },
    addSetToExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseSetToCircuit(circuitId, exerciseId));
    },
    deleteSetFromExerciseHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(deleteExerciseSetFromCircuit(setId, circuitId, exerciseId));
    },
    toggleExerciseSetHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(toggleExerciseSetAsDone(setId, circuitId, exerciseId));
    },
  } as unknown as WorkoutScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
