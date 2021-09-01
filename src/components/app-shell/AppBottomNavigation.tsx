import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Slide,
} from '@material-ui/core';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { mobileRoutes } from '../../configs/constants/mobile-routes';
import { State } from '../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      top: 'auto',
      bottom: 0,
    },
    toolbar: {
      padding: 0,
      color: '#fff',
      height: '8vh',
    },
    navRoot: {
      width: '100%',
      height: '100%',
    },
    hide: {
      display: 'none',
    },
  })
);

const AppBottomNavigation = (props: AppBottomNavigationProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide
      mountOnEnter
      unmountOnExit
      direction={'up'}
      in={props.selectedNavTestId !== 'mobile-workout-nav'}
    >
      <AppBar
        position={'fixed'}
        className={clsx(classes.root, {
          [classes.hide]: props.selectedNavTestId === 'mobile-workout-nav',
        })}
      >
        <Toolbar className={classes.toolbar}>
          <BottomNavigation
            className={classes.navRoot}
            value={props.selectedNavTestId}
          >
            {Object.keys(mobileRoutes).map((route: string, index: number) => {
              const currentRoute = mobileRoutes[route];
              return (
                <BottomNavigationAction
                  key={index}
                  value={currentRoute.testId}
                  label={currentRoute.headerTitle}
                  icon={React.createElement(currentRoute.icon)}
                  onClick={() => {
                    props.routeClickHandler(currentRoute.path);
                  }}
                />
              );
            })}
          </BottomNavigation>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export interface AppBottomNavigationProps {
  routeClickHandler: (path: string) => void;
  selectedNavTestId: string;
}

const mapStateToProps = (state: State): AppBottomNavigationProps => {
  return {
    selectedNavTestId: state.applicationState.selectedNavTestId,
  } as unknown as AppBottomNavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBottomNavigationProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as AppBottomNavigationProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBottomNavigation);
