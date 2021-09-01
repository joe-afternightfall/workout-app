import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: 48,
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  })
);

const MessageAppBar = (
  props: MessageAppBarProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  let appBarMessage = '';

  switch (props.activeTab) {
    case 0:
      appBarMessage = 'Workouts';
      break;
    case 1:
      appBarMessage = 'Routines';
      break;
    case 2:
      appBarMessage = 'Preview Workout';
      break;
    default:
      break;
  }

  const routeAndClick = () => {
    props.routeClickHandler();
    props.clickHandler();
  };

  return (
    <AppBar position={'absolute'} className={classes.root}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <IconButton
              edge={'start'}
              color={'inherit'}
              onClick={
                props.activeTab === 0 ? routeAndClick : props.clickHandler
              }
              className={classes.menuButton}
            >
              <ArrowBackIcon fontSize={'small'} />
            </IconButton>
          </Grid>

          <Grid item xs={8} container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'overline'}>{appBarMessage}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface PassedInProps {
  activeTab: number;
  clickHandler: () => void;
}

export interface MessageAppBarProps {
  routeClickHandler: () => void;
}

const mapStateToProps = (): MessageAppBarProps => {
  return {} as unknown as MessageAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): MessageAppBarProps =>
  ({
    routeClickHandler: () => {
      dispatch(routerActions.goBack());
    },
  } as unknown as MessageAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(MessageAppBar);
