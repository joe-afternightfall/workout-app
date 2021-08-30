import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { mobileRoutes } from '../../configs/constants/mobile-routes';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      padding: 0,
      color: '#fff',
    },
    root: {
      top: 'auto',
      bottom: 0,
    },
  })
);

const BottomAppBar = (props: BottomAppBarProps): JSX.Element => {
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
        <Tabs
          value={value}
          onChange={handleChange}
          variant={'fullWidth'}
          style={{ width: '100%' }}
        >
          {Object.keys(mobileRoutes).map((route: string, index: number) => {
            return (
              <Tab
                key={index}
                icon={React.createElement(mobileRoutes[route].icon)}
                label={mobileRoutes[route].headerTitle}
                onClick={() => {
                  props.routeClickHandler(mobileRoutes[route].path);
                }}
              />
            );
          })}
        </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomAppBar);
