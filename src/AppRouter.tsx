import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PageProps, routes } from './configs/constants/routes';
import { useTheme } from '@material-ui/core/styles';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import MobileApp from './MobileApp';
import { mobileRoutes } from './configs/constants/mobile-routes';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return props.isValidated ? (
    isMobile ? (
      <MobileApp>
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
        </div>
      </MobileApp>
    ) : (
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
    )
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
