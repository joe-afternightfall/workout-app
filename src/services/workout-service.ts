import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { routerActions } from 'react-router-redux';
import { workoutsSnapToVO } from '../utils/vo-builder';
import { clearWorkoutScreen } from '../creators/workout';
import { WorkoutDAO } from '../configs/models/WorkoutDAO';
import { loadUsersWorkouts } from '../creators/user-info';
import { DASHBOARD_SCREEN_PATH } from '../configs/constants/app';
import { WORKOUTS_ROUTE } from '../configs/constants/firebase-routes';

export const saveWorkout =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const username = getState().applicationState.userEmail;
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

export const getWorkoutsForUser =
  (email: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(WORKOUTS_ROUTE)
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          dispatch(loadUsersWorkouts(workoutsSnapToVO(snapshot.val())));
        } else {
          dispatch(loadUsersWorkouts([]));
        }
      });
  };
