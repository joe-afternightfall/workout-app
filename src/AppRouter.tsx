import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import {
  appRoutes,
  MOBILE_ACTIVE_WORKOUT_SCREEN_PATH,
  MOBILE_WORKOUT_DONE_PATH,
} from './configs/constants/app';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import ActiveWorkout from './components/top-level-components/mobile-app/active-workout-screen/ActiveWorkoutConnector';
import WorkoutDone from './components/top-level-components/mobile-app/active-workout-screen/4-workout-done/WorkoutDone';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.isValidated ? (
    <App>
      <div className={'route'}>
        {Object.keys(appRoutes).map((value: string, index: number) => {
          return (
            <Route
              key={index}
              exact
              path={appRoutes[value].path}
              component={appRoutes[value].routerComponent}
            />
          );
        })}

        <Route
          exact
          path={MOBILE_ACTIVE_WORKOUT_SCREEN_PATH}
          component={ActiveWorkout}
        />
        <Route exact path={MOBILE_WORKOUT_DONE_PATH} component={WorkoutDone} />
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

interface AppRouterProps {
  isValidated: boolean;
}

const mapStateToProps = (state: State): AppRouterProps => {
  return {
    isValidated: state.applicationState.userIsValidated,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
