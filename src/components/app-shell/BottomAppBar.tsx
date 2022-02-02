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
import { State } from '../../configs/redux/store';
import {
  ACTIVE_WORKOUT_SCREEN_ID,
  appRoutes,
  PREVIEW_WORKOUT_SCREEN_ID,
  ROUTINES_SCREEN_ID,
  WORKOUT_DONE_SCREEN_ID,
} from '../../configs/constants/app-routing';

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

const BottomAppBar = (props: BottomAppBarProps): JSX.Element => {
  const classes = useStyles();
  const { activePageId } = props;

  return (
    <Slide mountOnEnter unmountOnExit direction={'up'} in={true}>
      <AppBar
        position={'fixed'}
        className={clsx(classes.root, {
          [classes.hide]:
            activePageId === ROUTINES_SCREEN_ID ||
            activePageId === PREVIEW_WORKOUT_SCREEN_ID ||
            activePageId === ACTIVE_WORKOUT_SCREEN_ID ||
            activePageId === WORKOUT_DONE_SCREEN_ID,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <BottomNavigation className={classes.navRoot} value={activePageId}>
            {Object.keys(appRoutes).map((route: string, index: number) => {
              const currentRoute = appRoutes[route];
              return (
                currentRoute.icon &&
                currentRoute.bottomNav && (
                  <BottomNavigationAction
                    key={index}
                    data-testid={currentRoute.id}
                    value={currentRoute.id}
                    label={currentRoute.title}
                    icon={React.createElement(currentRoute.icon)}
                    onClick={() => {
                      props.routeClickHandler(currentRoute.path);
                    }}
                  />
                )
              );
            })}
          </BottomNavigation>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

interface BottomAppBarProps {
  routeClickHandler: (path: string) => void;
  activePageId: string;
}

const mapStateToProps = (state: State): BottomAppBarProps => {
  return {
    activePageId: state.applicationState.activePageId,
  } as unknown as BottomAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BottomAppBarProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as BottomAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(BottomAppBar);
