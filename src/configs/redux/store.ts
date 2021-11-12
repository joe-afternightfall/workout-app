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
      workoutConfigurations: {
        trainingSetTypes: [],
        phases: [],
        workoutCategories: [],
        equipmentList: [],
        gripWidths: [],
        gripTypes: [],
        parameterTypes: [],
        exercises: [],
        routineTemplates: [],
        exerciseImages: [],
      },
    } as unknown as ApplicationState,
    workoutState: {
      displayEditPreviewList: false,
      displayEditSet: false,
      displayWhichPhaseDialog: false,
      displayExerciseWidgetOnRoutinePreviewPage: false,
      displayDoneButtonInEditSetAppBar: false,
      newSuperSetExerciseIdsForRoutine: [],
      deleteExerciseDrawerProps: {
        open: false,
        segmentId: '',
        phaseType: '',
      },
    } as unknown as WorkoutState,
  });
};

export interface State {
  applicationState: ApplicationState;
  workoutState: WorkoutState;
}
