import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import WorkoutScreen, { WorkoutScreenProps } from './WorkoutScreen';
import { State } from '../../../configs/redux/store';
import {
  addExerciseToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
} from '../../../creators/workout';

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
  } as unknown as WorkoutScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
