import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import {
  ACTIVE_WORKOUT_SCREEN_ID,
  appRoutes,
  PREVIEW_WORKOUT_SCREEN_ID,
  ROUTINES_SCREEN_ID,
} from './configs/constants/app-routing';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.isValidated ? (
    <App bottomPadding={props.bottomPadding}>
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
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

interface AppRouterProps {
  isValidated: boolean;
  bottomPadding: boolean;
}

const mapStateToProps = (state: State): AppRouterProps => {
  const activePageId = state.applicationState.activePageId;
  let addBottomPadding = true;

  if (activePageId === ROUTINES_SCREEN_ID) {
    addBottomPadding = false;
  } else if (activePageId === PREVIEW_WORKOUT_SCREEN_ID) {
    addBottomPadding = false;
  } else if (activePageId === ACTIVE_WORKOUT_SCREEN_ID) {
    addBottomPadding = false;
  }
  return {
    isValidated: state.applicationState.userIsValidated,
    bottomPadding: addBottomPadding,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
