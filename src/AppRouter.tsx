import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import { WORKOUT_SCREEN_PATH } from './configs/constants/app';
import { mobileRoutes } from './configs/constants/mobile-routes';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import WorkoutScreen from './components/top-level-components/workout-screen/WorkoutScreenConnector';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return props.isValidated ? (
    <App>
      <div className={'route'}>
        {Object.keys(mobileRoutes).map((value: string, index: number) => {
          return (
            <Route
              key={index}
              exact
              path={mobileRoutes[value].path}
              component={mobileRoutes[value].routerComponent}
            />
          );
        })}

        <Route exact path={WORKOUT_SCREEN_PATH} component={WorkoutScreen} />
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

export interface AppRouterProps {
  isValidated: boolean;
}

const mapStateToProps = (state: State): AppRouterProps => {
  return {
    isValidated: state.applicationState.userIsValidated,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
