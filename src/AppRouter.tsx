import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { State } from './configs/redux/store';
import { mobileRoutes } from './configs/constants/mobile-routes';
import { MOBILE_ACTIVE_WORKOUT_SCREEN_PATH } from './configs/constants/app';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import ActiveWorkout from './components/top-level-components/mobile-app/active-workout-screen/ActiveWorkout';

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

        <Route
          exact
          path={MOBILE_ACTIVE_WORKOUT_SCREEN_PATH}
          component={ActiveWorkout}
        />
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
