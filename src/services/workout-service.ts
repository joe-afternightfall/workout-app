import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { routerActions } from 'react-router-redux';
import { workoutsSnapToVO } from '../utils/vo-builder';
import { WorkoutVO, WorkoutDAO } from 'workout-app-common-core';
import { clearWorkoutScreen } from '../creators/workout';
import { DASHBOARD_SCREEN_PATH } from '../configs/constants/app';
import { WORKOUTS_ROUTE } from '../configs/constants/firebase-routes';
import { stopStopwatch } from '../creators/stopwatch';

export const saveWorkout =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    if (getState().applicationState.stopwatch.running) {
      dispatch(stopStopwatch());
    }
    const username = getState().applicationState.userEmail;
    const circuits = getState().applicationState.workout.circuits;
    const workoutDate = getState().applicationState.workout.date;
    const workoutTime = {
      currentTimeMs: getState().applicationState.stopwatch.currentTimeMs,
      currentTimeSec: getState().applicationState.stopwatch.currentTimeSec,
      currentTimeMin: getState().applicationState.stopwatch.currentTimeMin,
    };

    const ref = firebase.database().ref(WORKOUTS_ROUTE);
    const newRef = ref.push();

    const workoutDAO = new WorkoutDAO(
      uuidv4(),
      username,
      circuits,
      workoutDate.toLocaleDateString(),
      workoutTime
    );

    return await newRef.set(workoutDAO, (error: Error | null) => {
      if (error) {
        return Promise.reject();
      } else {
        dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
        dispatch(clearWorkoutScreen());
        return Promise.resolve();
      }
    });
  };

export const getWorkoutsForUser = async (
  email: string
): Promise<WorkoutVO[]> => {
  return await firebase
    .database()
    .ref(WORKOUTS_ROUTE)
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return workoutsSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};
