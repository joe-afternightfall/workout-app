import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function PlankTimer(props: PlankTimerProps): JSX.Element {
  const classes = useStyles();
  const timerArray = [30, 10, 30, 10, 30, 0];
  const messagesArray = [
    'Plank #1',
    'Take A Break',
    'Plank #2',
    'Almost Done',
    'Plank #3',
    'All Done!',
  ];
  const [key, setKey] = useState(0);
  const [counter, setCounter] = useState(0);
  const [duration, setDuration] = useState(10);
  const [message, setMessage] = useState('Get ready to start');

  const handleComplete = (): [value: boolean, value: number] => {
    setCounter(counter + 1);
    setMessage(messagesArray[counter]);
    if (counter > 0) {
      props.nextStepHandler();
    }
    if (counter === 6) {
      return [false, 3000];
    }
    setDuration(timerArray[counter]);
    setKey(key + 1);
    return [true, 0];
  };

  if (counter === 6) {
    setTimeout(() => {
      props.closeHandler();
      props.resetStepperHandler();
    }, 2000);
  }

  return counter === 6 ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={'h6'}>{'All Done, Nice Job!'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CheckIcon fontSize={'large'} />
      </Grid>
    </Grid>
  ) : (
    <CountdownCircleTimer
      key={key}
      isPlaying={props.isPlaying}
      duration={duration}
      colors={[
        ['#004777', 0.33],
        ['#F7B801', 0.33],
        ['#A30000', 0.33],
      ]}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => {
        return (
          <Grid container style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography>{message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{remainingTime}</Typography>
            </Grid>
          </Grid>
        );
      }}
    </CountdownCircleTimer>
  );
}

export interface PlankTimerProps {
  isPlaying: boolean;
  closeHandler: () => void;
  nextStepHandler: () => void;
  resetStepperHandler: () => void;
}
