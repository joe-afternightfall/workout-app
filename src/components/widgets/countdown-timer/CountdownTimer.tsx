import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { closeCountdownTimer } from '../../../creators/workout/active-workout';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: '50%',
      // background: theme.palette.primary.main,
      height: '90%',
      margin: 'auto',
      width: '90%',
      // background: 'black',
    },
  })
);

const CountdownTimer = (props: CountdownTimerProps): JSX.Element => {
  const classes = useStyles();
  const { open, duration } = props;

  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            backgroundColor: 'black',
            boxShadow: 'none',
            borderRadius: '50%',
          },
        }}
      >
        <CountdownCircleTimer
          key={'circleTimerKey'}
          isPlaying={open}
          duration={duration}
          strokeWidth={4}
          trailColor={'#ED440B'}
          colors={[['#83432e', 100]]}
          onComplete={props.closeHandler}
        >
          {}
          {({ remainingTime }) => {
            return (
              <Grid container style={{ height: '100%', textAlign: 'center' }}>
                <Button className={classes.button} onClick={props.closeHandler}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant={'body1'}>{'Rest'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={'h6'}
                        color={'primary'}
                        style={{
                          fontWeight: 'bold',
                          fontSize: 40,
                        }}
                      >
                        {remainingTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant={'overline'} color={'primary'}>
                        {'press to skip'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            );
          }}
        </CountdownCircleTimer>
      </Dialog>
    </div>
  );
};

interface CountdownTimerProps {
  open: boolean;
  duration: number;
  closeHandler: () => void;
}

const mapStateToProps = (state: State): CountdownTimerProps => {
  return {
    duration: state.workoutState.countdownTimer.seconds,
    open: state.workoutState.countdownTimer.display,
  } as unknown as CountdownTimerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CountdownTimerProps =>
  ({
    closeHandler: () => {
      dispatch(closeCountdownTimer());
    },
  } as unknown as CountdownTimerProps);

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
