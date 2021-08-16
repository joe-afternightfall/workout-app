import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  stopStopwatch,
  startStopwatch,
  resetStopwatch,
  updateStopwatch,
} from '../../../../creators/stopwatch';
import Stopwatch, { StopwatchProps, StopwatchState } from './Stopwatch';
import { State } from '../../../../configs/redux/store';

const mapStateToProps = (state: State): StopwatchProps => {
  return {
    stopwatchState: {
      running: state.applicationState.stopwatch.running,
      currentTimeMs: state.applicationState.stopwatch.currentTimeMs,
      currentTimeSec: state.applicationState.stopwatch.currentTimeSec,
      currentTimeMin: state.applicationState.stopwatch.currentTimeMin,
      watch: state.applicationState.stopwatch.watch,
    },
  } as unknown as StopwatchProps;
};

const mapDispatchToProps = (dispatch: Dispatch): StopwatchProps =>
  ({
    startHandler: (watch: ReturnType<typeof setTimeout>) => {
      dispatch(startStopwatch(watch));
    },
    stopHandler: () => {
      dispatch(stopStopwatch());
    },
    resetHandler: () => {
      dispatch(resetStopwatch());
    },
    updateHandler: (state: StopwatchState) => {
      dispatch(updateStopwatch(state));
    },
  } as unknown as StopwatchProps);

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
