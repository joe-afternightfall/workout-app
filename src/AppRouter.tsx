import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import { PageProps, routes } from './configs/constants/routes';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.username ? (
    <App>
      <div className={'route'}>
        {Object.keys(routes).map((value: string) => {
          return routes[value].pageProps.map(
            (page: PageProps, index: number) => {
              return (
                <Route
                  key={index}
                  exact
                  path={page.path}
                  component={page.routerComponent}
                />
              );
            }
          );
        })}
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

export interface AppRouterProps {
  username: string;
}

const mapStateToProps = (state: State): AppRouterProps => {
  return {
    username: state.applicationState.username,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
