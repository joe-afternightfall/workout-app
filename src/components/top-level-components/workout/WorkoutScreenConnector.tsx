import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import WorkoutScreen, { WorkoutScreenProps } from './WorkoutScreen';
import { State } from '../../../configs/redux/store';
import {
  addExerciseToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
} from '../../../creators/workout';
import { ThunkDispatch } from 'redux-thunk';
import { saveWorkout } from '../../../services/workout-service';

const mapStateToProps = (state: State): WorkoutScreenProps => {
  return {
    exercises: state.applicationState.exercises,
    circuits: state.applicationState.circuits,
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
  } as unknown as WorkoutScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
