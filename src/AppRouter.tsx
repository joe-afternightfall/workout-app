import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import { appRoutes } from './configs/constants/app-routing';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

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
