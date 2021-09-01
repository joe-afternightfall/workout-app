import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { routerActions } from 'connected-react-router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { mobileRoutes } from '../../configs/constants/mobile-routes';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

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
  })
);

const BottomNavigation = (props: BottomAppBarProps): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    e: React.ChangeEvent<Record<string, never>>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <AppBar position={'fixed'} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.navRoot}
        >
          {Object.keys(mobileRoutes).map((route: string, index: number) => {
            return (
              <BottomNavigationAction
                key={index}
                label={mobileRoutes[route].headerTitle}
                icon={React.createElement(mobileRoutes[route].icon)}
                onClick={() => {
                  props.routeClickHandler(mobileRoutes[route].path);
                }}
              />
            );
          })}
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  );
};

export interface BottomAppBarProps {
  routeClickHandler: (path: string) => void;
}

const mapStateToProps = (): BottomAppBarProps => {
  return {} as unknown as BottomAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BottomAppBarProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as BottomAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigation);
