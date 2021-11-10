import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LinkIcon from '@material-ui/icons/Link';
import { routerActions } from 'connected-react-router';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { State } from '../../../../../../../../configs/redux/store';
import { Button, Grid, Slide, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { startWorkout } from '../../../../../../../../creators/workout/workout-selections';
import { ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../../../configs/constants/app';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '6vh',
      width: '100%',
      zIndex: 5,
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: theme.palette.primary.main,
    },
    button: {
      borderRadius: 0,
      height: '100%',
      // background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    buttonWrapper: {
      height: '100%',
    },
    icon: {
      height: '2.75vh',
      marginTop: -12,
    },
    text: {
      fontSize: '1.5vh',
      lineHeight: '0.75vh',
    },
    leftButton: {
      borderRight: '6px solid #313131',
    },
    rightButton: {
      borderLeft: '6px solid #313131',
    },
  })
);

const BottomActionButtons = (props: BottomActionButtonsProps): JSX.Element => {
  const classes = useStyles();

  if (props.displayEditOptions) {
    return (
      <Slide mountOnEnter unmountOnExit direction={'up'} in={true}>
        <Grid container className={classes.root}>
          <Grid item xs={6} className={classes.buttonWrapper}>
            <Button
              fullWidth
              className={clsx(classes.button, classes.leftButton)}
            >
              <Grid container>
                <Grid item xs={12}>
                  <FitnessCenterIcon className={classes.icon} />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.text}>
                    {'+ Exercise'}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.buttonWrapper}>
            <Button
              fullWidth
              className={clsx(classes.button, classes.rightButton)}
            >
              <Grid container>
                <Grid item xs={12}>
                  <LinkIcon className={classes.icon} />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.text}>
                    {'+ Superset'}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Slide>
    );
  } else {
    return (
      <Grid container className={classes.root}>
        <Button
          fullWidth
          className={classes.button}
          onClick={props.startClickHandler}
        >
          {'Start Workout'}
        </Button>
      </Grid>
    );
  }
};

interface BottomActionButtonsProps {
  displayEditOptions: boolean;
  startClickHandler: () => void;
}

const mapStateToProps = (state: State): BottomActionButtonsProps => {
  return {
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as BottomActionButtonsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BottomActionButtonsProps =>
  ({
    startClickHandler: () => {
      dispatch(startWorkout());
      dispatch(routerActions.push(ACTIVE_WORKOUT_SCREEN_PATH));
    },
  } as unknown as BottomActionButtonsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomActionButtons);
