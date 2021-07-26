import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import WorkoutScreen, { WorkoutScreenProps } from './WorkoutScreen';
import { State } from '../../../configs/redux/store';

const mapStateToProps = (state: State): WorkoutScreenProps => {
  return {
    exercises: state.applicationState.exercises,
  } as unknown as WorkoutScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutScreenProps =>
  ({} as unknown as WorkoutScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
