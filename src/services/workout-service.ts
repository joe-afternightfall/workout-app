import { State } from '../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import firebase from 'firebase';
import { WORKOUTS_ROUTE } from '../configs/constants/firebase-routes';
import { WorkoutDAO } from '../configs/models/WorkoutDAO';
import { v4 as uuidv4 } from 'uuid';
import { clearWorkoutScreen } from '../creators/workout';
import { routerActions } from 'react-router-redux';
import { DASHBOARD_SCREEN_PATH } from '../configs/constants/app';

export const saveWorkout =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const username = getState().applicationState.username;
    const circuits = getState().applicationState.workout.circuits;
    const workoutDate = getState().applicationState.workout.date;
    // todo: add workoutTime to redux and rip out of component
    // const workoutTime = getState().applicationState.workoutTime;

    const ref = firebase.database().ref(WORKOUTS_ROUTE);
    const newRef = ref.push();

    const workoutDAO = new WorkoutDAO(
      uuidv4(),
      username,
      circuits,
      workoutDate.toLocaleDateString()
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
