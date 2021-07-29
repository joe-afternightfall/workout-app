import React from 'react';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, List } from '@material-ui/core';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import { RouteProp, routes } from '../../../../configs/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useStyles();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <List
      component={'nav'}
      className={classes.root}
      aria-labelledby={'nested-list-subheader'}
    >
      {Object.keys(routes).map((value: string, index: number) => {
        return (
          <NavListItem
            key={index}
            displayText={true}
            activePath={props.activePage.path}
            pageInfo={routes[value]}
            clickHandler={() => {
              props.clickHandler(routes[value].path);
            }}
          />
        );
      })}

      <Grid container justifyContent={'center'}>
        <Grid item style={{ marginTop: 40 }}>
          <Button onClick={logout}>{'Sign Out'}</Button>
        </Grid>
      </Grid>
    </List>
  );
};

export interface NavigationProps {
  activePage: RouteProp;
  clickHandler: (path: string) => void;
}

const mapStateToProps = (state: State): NavigationProps => {
  return {
    activePage: state.applicationState.activePage,
  } as unknown as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  ({
    clickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
