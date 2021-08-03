import App from './App';
import firebase from 'firebase';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Route } from 'react-router';
import React, { Component } from 'react';
import { routes } from './configs/routes';
import { Styles } from '@material-ui/styles';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class AppRouter extends Component<AppRouterProps> {
  state = {
    user: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
        });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render(): JSX.Element {
    return this.state.user ? (
      <App>
        <div className={'route'}>
          {Object.keys(routes).map((value: string, index: number) => {
            return (
              <Route
                key={index}
                component={routes[value].routerComponent}
                exact
                path={routes[value].path}
              />
            );
          })}
        </div>
      </App>
    ) : (
      <SignInScreen />
    );
  }
}

export type AppRouterProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(AppRouter);
