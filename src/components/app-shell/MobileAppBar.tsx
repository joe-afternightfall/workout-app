import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { routerActions } from 'connected-react-router';
import { mobileRoutes } from '../../configs/constants/mobile-routes';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      width: '100%',
      padding: 0,
      color: '#fff',
    },
    root: {
      top: 'auto',
      bottom: 0,
    },
  })
);

const MobileAppBar = (props: MobileAppBarProps): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    e: React.ChangeEvent<Record<string, never>>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <AppBar position={'fixed'} color={'primary'} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={'fullWidth'}
          style={{ margin: 'auto' }}
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

export interface MobileAppBarProps {
  routeClickHandler: (path: string) => void;
}

const mapStateToProps = (state: any): MobileAppBarProps => {
  return {} as unknown as MobileAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): MobileAppBarProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as MobileAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(MobileAppBar);
