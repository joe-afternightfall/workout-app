import React from 'react';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import { PageProps, RouteProp, routes } from '../../../../configs/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          'CAUGHT_FIREBASE_ERROR: ' + errorCode + ' message: ' + errorMessage
        );
      });
  };

  return (
    <List
      component={'nav'}
      className={classes.root}
      aria-labelledby={'nested-list-subheader'}
    >
      {Object.keys(routes).map((value: string, index: number) => {
        if (routes[value].nested) {
          return (
            <>
              <ListItem
                button
                onClick={() => {
                  open ? setOpen(false) : setOpen(true);
                }}
              >
                <ListItemIcon>
                  {React.createElement(routes[value].mainIcon)}
                </ListItemIcon>
                <ListItemText primary={routes[value].mainTitle} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout={'auto'} unmountOnExit>
                <List
                  component={'div'}
                  disablePadding
                  className={classes.nested}
                >
                  {routes[value].pageProps.map(
                    (page: PageProps, secondIndex: number) => {
                      return (
                        <NavListItem
                          key={secondIndex}
                          displayText={true}
                          currentLocation={props.currentLocation}
                          pageInfo={routes[value].pageProps[secondIndex]}
                          clickHandler={() => {
                            props.clickHandler(
                              routes[value].pageProps[secondIndex].path
                            );
                          }}
                        />
                      );
                    }
                  )}
                </List>
              </Collapse>
            </>
          );
        } else {
          return (
            <NavListItem
              key={index}
              displayText={true}
              currentLocation={props.currentLocation}
              pageInfo={routes[value].pageProps[0]}
              clickHandler={() => {
                props.clickHandler(routes[value].pageProps[0].path);
              }}
            />
          );
        }
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
  currentLocation: string;
  clickHandler: (path: string) => void;
}

const mapStateToProps = (state: State): NavigationProps => {
  return {
    activePage: state.applicationState.activePage,
    currentLocation: state.applicationState.currentLocation,
  } as unknown as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  ({
    clickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
  } as unknown as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
