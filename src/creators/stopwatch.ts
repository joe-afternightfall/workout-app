import { ActionTypes } from './actions';
import { StopwatchState } from '../components/top-level-components/workout-screen/stopwatch/Stopwatch';

export interface StopStopwatchAction {
  type: ActionTypes.STOP_STOPWATCH;
}

export const stopStopwatch = (): StopStopwatchAction => {
  return {
    type: ActionTypes.STOP_STOPWATCH,
  };
};

export interface StartStopwatchAction {
  type: ActionTypes.START_STOPWATCH;
  watch: ReturnType<typeof setTimeout>;
}

export const startStopwatch = (
  watch: ReturnType<typeof setTimeout>
): StartStopwatchAction => {
  return {
    type: ActionTypes.START_STOPWATCH,
    watch: watch,
  };
};

export interface ResetStopwatchAction {
  type: ActionTypes.RESET_STOPWATCH;
}

export const resetStopwatch = (): ResetStopwatchAction => {
  return {
    type: ActionTypes.RESET_STOPWATCH,
  };
};

export interface UpdateStopwatchAction {
  type: ActionTypes.UPDATE_STOPWATCH;
  stopwatchState: StopwatchState;
}

export const updateStopwatch = (
  state: StopwatchState
): UpdateStopwatchAction => {
  return {
    type: ActionTypes.UPDATE_STOPWATCH,
    stopwatchState: state,
  };
};
