import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function StopwatchDisplay(
  props: StopwatchDisplayProps
): JSX.Element {
  const classes = useStyles();
  const { minutes, seconds } = props;

  const formatTime = (val: number, option?: string): string => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (option === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  return (
    <div>
      <Typography variant={'h3'}>
        {`${formatTime(minutes)}:${formatTime(seconds)}`}
      </Typography>
    </div>
  );
}

export interface StopwatchDisplayProps {
  // hour: string;
  minutes: number;
  seconds: number;
  // currentTimeMs: number;
  displayText: boolean;
}
