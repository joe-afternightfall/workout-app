import {
  Store,
  combineReducers,
  applyMiddleware,
  createStore as originalCreateStore,
} from 'redux';
import { History } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import workout, { WorkoutState } from '../../reducers/workout';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import application, { ApplicationState } from '../../reducers/application';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      workoutState: workout.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: {
      workoutConfigurations: {
        exerciseTypes: [],
        categoryTypes: [],
        circuitTypes: [],
      },
      workout: {
        date: new Date(),
        circuits: [],
        time: '',
      },
      expandedAccordion: '',
      openUserProfileDialog: false,
      userProfile: {
        firebaseId: '',
        id: '',
        email: '',
        profileIcon: '',
        displayName: '',
        height: {
          feet: '',
          inches: '',
        },
        weights: [],
        dateOfBirth: '',
        lastUpdatedOn: '',
      },
      setupNewUser: false,
      stopwatch: {
        running: false,
        currentTimeMs: 0,
        currentTimeSec: 0,
        currentTimeMin: 0,
        watch: 0,
      },
      selectedMuscleGroupIds: [],
      applyHoverStylesToMuscleGroup: '',
      circuitTemplates: [],
    } as unknown as ApplicationState,
    workoutState: {} as unknown as WorkoutState,
  });
};

export interface State {
  applicationState: ApplicationState;
}
